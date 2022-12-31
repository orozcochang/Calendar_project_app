import axios from "axios";
import React from "react";
import { useState } from "react";
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'

function Login (){

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    const [buttonable, setButtonable] = useState(true)
    const [user,setUser] =useState(null)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  
  const handlePassChange = event => {
    setPass(event.target.value)
    
}
  const handleChange = event => {
    setEmail(event.target.value)
    setButtonable(false)
    if(!isValidEmail(email)){
        setButtonable(true)
    }
    }
async function login(){
    axios.defaults.headers.common["X-CSRFToken"]=csrftoken
console.log('login button')
if(isValidEmail(email)){
    let response = await axios.post('api/login/',{'email':email,'pass':pass})
    console.log(response.data)
    
    if(response.data.success === true){
        setUser(email)
    }

}
}


    

    return (
<div>
    <div className={"card border-primary mb-3"} style={{maxWidth: '20rem'}}>
        <div className={"card-header"}>Please <a href="">Register</a>. or Login</div>
        <div className={"card-body"}>
        <form>
            <center>  
                    <input type={'text'} id='email' placeholder='Email' onChange={handleChange}></input>
                        {error && <p className={"text-danger"}>{error}</p>}
                        {success && <p className={"text-success"}>{success}</p>}
                    <input type={'password'} id='password' placeholder='Password' onChange={handlePassChange}></input>
            </center>
                    <div className={"d-grid gap-2"} style={{alignContent:'center', flexDirection:'column',margin:'10px'}}>
            <center>
                <button className={"btn btn-primary"} type={"button"} style={{width:'250px', flexDirection: 'column', alignItems:'center'}} onClick={login} disabled={buttonable}>Login</button>
            </center>
            </div>
        </form>
             {user && <p className={"text-success"}>Welcome, {user}! Click the Home Button to continue.</p>}
            <p className={"card-text"}>Register or Login to access an easy way to schedule shifts.</p>
        </div>

    </div>
</div>

    )
}

export default Login