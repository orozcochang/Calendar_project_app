import axios from "axios";
import React from "react";
import { useState } from "react";
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'

function Authentication (){

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    const [buttonable, setButtonable] = useState(true)
    const [passError, setPassError] = useState(null)
    const [passLength,setPassLength]=useState(0)
    const [registration, setRegistration] = useState(null)
    const [registerError, setRegisterError]=useState(null)


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

 async function emailCheck(email){
const response = await axios.post('api/email-check/',{'email':email})
console.log(response.data)
if(response.data.success === true){
    return true
}
else{
    return false
}

  }
  const handlePassChange = event => {
    setPass(event.target.value)
    setPassError(null)
    setPassLength(pass.length)
    if(passLength >= 1){
        setButtonable(false)
    }
    else{
        setButtonable(true)
    }
}
  const handleChange = event => {
    setEmail(event.target.value)
    setSuccess(null)
    setError(null)
    setButtonable(false)
    if (event.target.value === ''){
        setError(null)
        setButtonable(true)
    }
    else if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
      setButtonable(true)
    } 
    else {
        setError(null)
        setSuccess('Email is valid')
        setButtonable(false)
        let check = emailCheck(event.target.value)
        console.log('THE CHECK',check)
        if (check === false){
            setSuccess('Email is valid')
        if(passLength < 1){
                setButtonable(true)
            }
        }
        else if (check === true){
            setSuccess(null)
            setError('Email is in use')
        }
        
        }
    }
function login(){
console.log('login button')
}
async function register(){

    console.log('register button')
    if (passLength > 0){
    let response = await axios.post('api/register/',{'email':email,'pass':pass})
    console.log(response.data)
    if (response.data.success === true){
        setRegistration('Succesfully registered, now try logging in.')
    }
    }
    else{
        setRegisterError('Failed to register, please try again.')
    }

}
    

    return (
<div>
    <div className={"card border-primary mb-3"} style={{maxWidth: '20rem'}}>
        <div className={"card-header"}>Please Register or <Link to='/login'>Login</Link></div>
        <div className={"card-body"}>
        <form>
            <center>  
                    <input type={'text'} id='email' placeholder='Email' onChange={handleChange}></input>
                        {error && <p className={"text-danger"}>{error}</p>}
                        {success && <p className={"text-success"}>{success}</p>}
                    <input type={'password'} id='password' placeholder='Password' onChange={handlePassChange}></input>
            </center>
                        {passError && <p className={"text-danger"}>{passError}</p>}
                    <div className={"d-grid gap-2"} style={{alignContent:'center', flexDirection:'column',margin:'10px'}}>
            <center>
                <button className={"btn btn-primary"} type={"button"} style={{width:'250px', flexDirection: 'column', alignItems:'center'}} onClick={register} disabled={buttonable}>Register</button>
                {registerError && <p className={"text-danger"}>{registerError}</p>}
                {registration && <p className={"text-success"}>{registration}</p>}
            </center>
            </div>
        </form>
            <p className={"card-text"}>Register or Login to access an easy way to schedule shifts.</p>
        </div>

    </div>
</div>

    )
}

export default Authentication