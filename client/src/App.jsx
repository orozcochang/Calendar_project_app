import React, { useState, useEffect, onEnter } from 'react';
import 'bootswatch/dist/vapor/bootstrap.min.css';
import Calendar  from './components/Calendar';
import axios from 'axios'
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom'
import HomePage from './components/Home';
import AddEventForm from './components/AddEvent';
import Authentication from './components/Authentication';
import Login from './components/Login';
import Account from './components/Account';

function App () {
  
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
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken
  

  function requireAuth(nextState, replace, next) {
    if (!authenticated) {
      replace({
        pathname: "",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }

  async function logout(){
    axios.post('api/logout/')
    console.log(response.data)
  }

  return(
    <>

<Router>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
          
          <a href='' style={{margin: '2px'}}> Home </a>
          <Link to='/' style={{margin: '2px'}}> Group </Link>
          <Link to='/account' style={{margin: '2px'}}> Account </Link>
          <a href='' style={{margin: '2px'}} onClick={logout}> Logout </a>
          </div>
        </nav>
        
      
        
        <Routes>
          <Route path='' element={<Authentication />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/dashboard' element={<HomePage />} onEnter={requireAuth}/>
          <Route path='/account' element={<Account />} onEnter={requireAuth}/>
        </Routes>
      </Router>
     <Calendar/>
    </>
  );
};

export default App