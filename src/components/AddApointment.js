import { clear } from "@testing-library/user-event/dist/clear";
import React,{useState} from "react";
import {BiCalendarPlus} from "react-icons/bi";

function AddWrite({toggleForm, formData, setFormData, formDataPublish}){
    if (!toggleForm) return null
    else return (
        <>
            {/* 내용  */}
            <ul>
                <li>
                    <label htmlFor="userownerName">집사명</label>
                    <input 
                        type="text" id="userownerName" 
                        onChange={(event) => {
                            setFormData({ ...formData, ownerName:event.target.value})
                        }}
                    />
                </li>
                <li>
                    <label htmlFor="userpetName">애기명</label>
                    <input
                        type="text" id="userpetName"
                        onChange={(event) => {
                            setFormData({ ...formData, petName: event.target.value})
                        }}
                    />
                </li>
                <li>
                    <label htmlFor="useraptDate">예약일</label>
                    <input
                        type="date" id="useraptDate" 
                        onChange={(event) => {
                            setFormData({ ...formData, aptDate: event.target.value })
                        }}
                    />
                </li>
                <li>
                    <label htmlFor="useraptTime">예약시간</label>
                    <input type="time" id="useraptTime" 
                        onChange={(event) => {
                            setFormData({ ...formData, aptTime: event.target.value })
                        }}
                    />
                </li>
                <li>
                    <label htmlFor="userDes">기타설명</label>
                    <textarea
                        cosl="30" rows="10"
                        placeholder="기타설명"
                        id="userDes"
                        onChange={(event) => {
                            setFormData({ ...formData, aptNotes: event.target.value })
                        }}
                    ></textarea>
                </li>
            </ul>

            {/* 제출버튼 */}
            <p>
                <button type="submit" onClick={formDataPublish}> 제출</button>
            </p>
        </>
    )
}

function AddApointment({onSecdAppointment, lastId}) {
    // 비어있는 객체 -> reset
    const clearData = {
        petName: "",
        ownerName: "",
        aptNotes: "",
        aptDate: ""
    }

    // state
    const [toggleForm, setToggleForm] = useState(false)
    const [formData, setFormData] = useState(clearData)

    function formDataPublish(){
        // 보낼 객체
        const appointmentInfo = {
            id:lastId+1,
            petName: formData.petName,
            ownerName: formData.ownerName,
            aptNotes: formData.aptNotes,
            aptDate: formData.aptDate+' '+formData.aptTime
        }

        // 데이터 보내기
        onSecdAppointment(appointmentInfo)

        // toggle, reset
        setToggleForm(!toggleForm)
        setFormData(clearData)

    }

    return (
        <div id="appoint">
            {/* 제목 */}
            <h4 onClick={()=>{setToggleForm(!toggleForm)}}>
                <BiCalendarPlus /> 예약하기
            </h4>
            <AddWrite 
                toggleForm={toggleForm}
                formData={formData}
                formDataPublish={formDataPublish}
                setFormData={setFormData}
            />
        </div>
    )
}

export default AddApointment