import React, { useEffect } from "react";
import 'bootswatch/dist/slate/bootstrap.min.css'
import { CalendarHeader } from "./CalendarHeader";
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
import Modal from "./Modal";
import { setSeconds } from "date-fns";


function HomePage() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const calendar = Calendar();
  const [date, setDate] = useState(new Date)
  const [nav, setNav] = useState(0);
  let currentMonth = monthNames[date.getMonth()]
  console.log('CURRENT MONTH', currentMonth)
  let currentDay = dayArray[date.getDay()]
  // console.log(currentDay)
  const [month, setMonth] = useState(currentMonth)
  const [day, setDay] = useState(currentDay)
  let newDate = add(new Date, { weeks: 4 })
  // console.log(monthNames[newDate.getMonth()])
  // console.log(add(date,{days: - (date.getDay())}))
  const [image, setImage] = useState('')
  const [mids, setMids] = useState([])
  useEffect(() => { personnelList() }, [])
  const [eventDate, setEventDate]= useState()
  const [eventUser, setEventUser] = useState()
  
  function handleClick () {
    console.log('ON CLICK',eventDate)
    console.log(eventUser)
  }

  async function firstURL() {
    let response = await axios.post('api/season/', { 'month': currentMonth })
    console.log(response.data.image_url)
    setImage(response.data.image_url)
  }
  firstURL()

  const [startWeek, setStartWeek] = useState(add(date, { days: - (date.getDay()) }))

  async function personnelList() {
    let response = await axios.get("api/the_people/")
    let data = response.data
    console.log(data)
    setMids(response.data)
  }



  console.log('------MIDS-----', mids)












  return (
    <div>
      <div style={{ paddingTop: '3px', paddingBottom: '3px' }}>
        <div style={{ paddingTop: '3px', paddingBottom: '3px' }}>
          <h4 className='mt-4' style={{ display: 'inline' }}>{monthNames[date.getMonth()]}</h4>
          <button onClick={() => { setDate(add(date, { weeks: 1 })), setStartWeek(add(startWeek, { days: 7 })) }} className='btn' style={{ display: 'inline', float: 'right', paddingTop: '3px', paddingBottom: '3px' }} id="nextButton">Next</button>
          <button onClick={() => { setDate(add(date, { weeks: -1 })), setStartWeek(add(startWeek, { days: -7 })) }} className='btn' style={{ display: 'inline', float: 'right', paddingTop: '3px', paddingBottom: '3px' }} id="backButton">Back</button>


        </div></div>

      <table class="table table-hover">
        <thead style={{ paddingTop: '3px' }}>
          <tr>
            <th scope="col" onClick={() => setDay(MyDatePicker)}><img src={image} alt={image} width={"50px"} height={"50px"} /></th>
            <th scope="col"><center>{startWeek.getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 1 })).getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 2 })).getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 3 })).getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 4 })).getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 5 })).getDate()}</center></th>
            <th scope="col"><center>{(add(startWeek, { days: 6 })).getDate()}</center></th>
          </tr>
          <tr>
            <th scope="col"></th>
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
          {mids.map(person => 
            
            (<>
            <tr>
              <th scope={"row"}>{person.email}</th>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
              <td className={"td"} onClick={()=> {handleClick(), setEventDate((add(startWeek,{days: 1 })).getDate()), setEventUser(person.email)}}></td>
            </tr>
            </>
            )
          )}

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