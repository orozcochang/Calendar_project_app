import axios from "axios";
import { intlFormatDistance } from "date-fns";
import React, { useState } from "react";

function Account(){
const[activeEmail,setActiveEmail]=useState()
const [editEmail,setEditEmail]=useState(null)
const [editPass,setEditPass]=useState(null)
const [newEmail,setNewEmail]=useState()
const [successEmail, setSuccessEmail] = useState(null)
const [errorMsg, setErrorMsg]=useState()
async function retrieveEmail(){
    let response = await axios.get('api/current_user/')
    console.log(response.data.success)
    let temp = response.data.success
    setActiveEmail(temp)
}
retrieveEmail()
const handleUpdateEmailValue = (e)=>{
    setNewEmail(e.target.value)
    console.log(newEmail)
}
const handleEditEmail = () =>{
    setEditEmail(!editEmail)
}
const handleEditPass = () =>{
    setEditPass(!editPass)
}
async function updateEmail(){
    handleEditEmail()
    console.log(newEmail)
    let response = await axios.put('api/update-email/',{'email':newEmail})
    console.log(response.data)
    if(response.data.success === true){
        setSuccessEmail(true)
        setErrorMsg('Email updated succesfully.')
        setTimeout(() => {
            setSuccessEmail(false)
            setErrorMsg(null)
        }, 3000);
    }
}



    return(

        <>
            
        <div className={"card border-primary mb-3"} style={{maxWidth: "30rem"}}>
            <div className={"card-header"}>Account Information</div>
            <div className={"card-body"}>
                <p className={"card-title"}>Registered email:</p>
                <p className={"card-title"}>{activeEmail}    <a className={"breadcrumb-item"} onClick={handleEditEmail}>Edit</a></p>
                {editEmail && <p><input className={"text-success"} onChange={handleUpdateEmailValue} placeholder="Enter new email"></input><button className={"btn btn-dark"} onClick={updateEmail}>Save</button><button className={"btn btn-dark"} style={{minWidth:"100px"}} onClick={handleEditEmail}>Cancel</button></p>}
                {successEmail && <p className={"text-success"}>{errorMsg}</p>}
                <a className={"card-title"} onClick={handleEditPass}>Set new password</a>
                {editPass && <p><input className={"text-success"} placeholder="Enter new password"></input><button className={"btn btn-dark"} onClick={handleEditPass}>Save</button><button className={"btn btn-dark"} style={{minWidth:"100px"}} onClick={handleEditPass}>Cancel</button></p>}
                 <p className={"card-text"}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
            
        </>
    )
}

export default Account