import React, { useEffect } from "react";
import 'bootswatch/dist/slate/bootstrap.min.css'
import { CalendarHeader } from "./CalendarHeader";
import { useDate } from "./Hooks";
import { useState } from "react";
import addDays from 'date-fns/addDays'
import add from "date-fns/add";
import getDate from "date-fns/getDate";
import DatePicker from "react-datepicker"
import MyDatePicker from "./DatePicker";
import Calendar from "./Calendar";
import AddEventForm from "./AddEvent";
import axios from "axios";
import personnel from "./personnel";


function HomePage(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const calendar = Calendar();
    const [date, setDate] = useState(new Date)
    const [nav, setNav] = useState(0);
    let currentMonth =  monthNames[date.getMonth()]
    console.log(currentMonth)
    let currentDay = dayArray[date.getDay()]
    console.log(currentDay)
    const [month, setMonth] = useState(currentMonth)
    const [day, setDay] = useState(currentDay)
    let newDate = add(new Date,{weeks:4})
    console.log(monthNames[newDate.getMonth()])
    console.log(add(date,{days: - (date.getDay())}))
    const [image, setImage] = useState('')
    async function firstURL() {
      let response = await axios.post('api/season/',{'month':currentMonth})
      console.log(response.data.image_url)
      setImage(response.data.image_url)
    }
    firstURL()
    
    const [startWeek, setStartWeek] = useState(add(date,{days: - (date.getDay())}))

    async function personnelList (shift){
      let response = await axios.get("api/the_people/")
      console.log(response.data.data['0'].shift)
      let data = response.data.data
      for(let i=0; i< data.length;i++){
        console.log(data[i])
        if (data[i].shift === shift){
          console.log(data[i].name)
        }
      }
      
      
      return response.data.data
    }
    personnelList('mids')


    

    
    
    
    
    
   


    return(
        <div>
            <div style={{paddingTop:'3px', paddingBottom:'3px'}}>
            <div style={{paddingTop:'3px', paddingBottom:'3px'}}>
      <h4  className='mt-4' style={{display:'inline'}}>{monthNames[date.getMonth()]}</h4>
        <button onClick={() => {setDate(add(date,{weeks:1})), setStartWeek(add(startWeek,{days:7}))}} className='btn' style={{display:'inline', float:'right', paddingTop:'3px', paddingBottom:'3px'}} id="nextButton">Next</button>
        <button onClick={() => {setDate(add(date,{weeks:-1})), setStartWeek(add(startWeek,{days:-7}))}} className='btn' style={{display:'inline', float:'right', paddingTop:'3px', paddingBottom:'3px'}} id="backButton">Back</button>
        
      
    </div></div>

<table class="table table-hover">
  <thead  style={{paddingTop:'3px'}}>
  <tr>
      <th scope="col" onClick={()=>setDay(MyDatePicker)}>{monthNames[date.getMonth()]}<img src={image} alt={image} width={"50px"} height={"50px"}/></th>
      <th scope="col">{startWeek.getDate()}</th>
      <th scope="col">{(add(startWeek,{days:1})).getDate()}</th>
      <th scope="col">{(add(startWeek,{days:2})).getDate()}</th>
      <th scope="col">{(add(startWeek,{days:3})).getDate()}</th>
      <th scope="col">{(add(startWeek,{days:4})).getDate()}</th>
      <th scope="col">{(add(startWeek,{days:5})).getDate()}</th>
      <th scope="col">{(add(startWeek,{days:6})).getDate()}</th>
    </tr>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">Sunday</th>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      <th scope="col">Wednesday</th>
      <th scope="col">Thursday</th>
      <th scope="col">Friday</th>
      <th scope="col">Saturday</th>
    </tr>
  </thead>
  <tbody>
  <tr class="table-dark">
      <th scope="row">Mids</th>
      <td></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr class="table-dark">
      <th scope="row">Days</th>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr class="table-dark">
      <th scope="row">Swings</th>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
  </tbody>
</table>

<div>
<Calendar />
<AddEventForm addEvent={calendar.addEvent} />
</div>
        </div>
        )

}

export default HomePage