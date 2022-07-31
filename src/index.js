import React,{useState,useEffect,useCallback} from 'react';
import ReactDOM from 'react-dom/client';

// 컴포넌트 import
import AddApointment from './components/AddApointment';
import AddInfo from './components/AddInfo';
import Search from './components/Search';

// 목업
// import addapoinData from './data.json';

// 소스파일
import './index.css'
import { BiArchive } from "react-icons/bi";

// App
function App(){
  // state

  // list
  const [appointList, setAppointList] = useState([])

  // search 정렬, 오름차순, 내림차순
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('petName')
  const [orderBy, setOrderBy] = useState('asc')

  const fileterAppointment = appointList.filter(
    item => {return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )}
  ).sort((a,b) => {
    let order = (orderBy === 'asc' ? 1 : -1) // 오름 1 : -1 / 내림 -1 : 1
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })

  //callback
  const fetchData = useCallback(()=> {
    fetch('./data.json')
    .then(response =>response.json())
    .then(data => setAppointList(data))
  },[])

  //useEffect
  useEffect(() => {fetchData()}, [fetchData])

  return(
    <article>
      {/* 제목 */}
      <h3>
        <BiArchive /> 예약 시스템
      </h3>

      {/* 예약하기 */}
      <AddApointment 
        onSecdAppointment={
          myAppointment => setAppointList([...appointList, myAppointment])
        }
        lastId={
          appointList.reduce((max,item) => Number(item.id) >  max ? Number(item.id) : max, 0)
        }
      />

      {/* 검색 */}
      <Search 
        query={query}
        onQueryChange={myQuery => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderChange={myOrder => setOrderBy(myOrder)}
        sortBy={sortBy}
        onSortChange={mySort => setSortBy(mySort)}
      />

      {/* 목록 */}
      <div id='list'>
        <ul>
          {fileterAppointment.map((appointment)=>(
              <AddInfo 
                key={appointment.id} 
                appointment={appointment}
                onDelecteAppoint = {
                  appointmentId => setAppointList(appointList.filter(appointment => appointment.id !== appointmentId))
                }
              />
          ))}
        </ul>
      </div>
    </article>
  )
}

// 출력
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)