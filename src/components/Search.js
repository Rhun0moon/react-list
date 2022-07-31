import React,{useState} from 'react';
import {BiSearch, BiCaretDown, BiCheck} from "react-icons/bi";

function DropDown({toggleSort, orderBy, onOrderChange, sortBy, onSortChange}){
    if (!toggleSort) return null
    else {
        return (
            <ul>
                <li onClick={() => onSortChange('petName')}>애기이름 
                    {sortBy==='petName' && <BiCheck />}
                </li>
                <li onClick={() => onSortChange('ownerName')}>예약자명
                    {sortBy === 'ownerName' && <BiCheck />}
                </li>
                <li onClick={() => onSortChange('aptDate')}>날짜
                    {sortBy === 'aptDate' && <BiCheck />}    
                </li>
                <li onClick={() => onOrderChange('asc')}>올림차순
                    {orderBy === 'asc' && <BiCheck />}
                </li>
                <li onClick={() => onOrderChange('desc')}>내림차순
                    {orderBy === 'desc' && <BiCheck />}
                </li>
            </ul>
        )
    }
}

function Search({ query, onQueryChange, orderBy, onOrderChange, sortBy, onSortChange}){
    const [toggleSort, setToggleSort] = useState(false)
    return (
        <div id="search">
            <p>
                <BiSearch />
                <input 
                    type="text" 
                    placeholder="serch" 
                    value={query}
                    onChange={
                        (event) => {onQueryChange(event.target.value)}
                    }
                >

                </input>
                <button type="button" onClick={()=>{setToggleSort(!toggleSort)}}>
                    정렬하기
                    <BiCaretDown/>
                </button>
            </p>
            <DropDown 
                toggleSort={toggleSort} 
                orderBy={orderBy}
                sortBy={sortBy}
                onOrderChange={myOrder => onOrderChange(myOrder)}
                onSortChange={mySort => onSortChange(mySort)}
            />
        </div>
    )
}

export default Search