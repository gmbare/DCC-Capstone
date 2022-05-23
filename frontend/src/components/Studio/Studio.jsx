import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import "./Studio.css"
import axios from 'axios';
import AuthContext from "../../context/AuthContext";

// var options = {month: 'long'}
const Studio = (props) => {
    const params = useParams()
    const [parlour, setParlour] = useState()

    const pullStudio = async (req) => {
        console.log(params.studioId)
        let res = await axios.get(`http://localhost:3001/api/studio/getstudio/${params.studioId}`)
        setParlour(res.data)
    }

<<<<<<< HEAD
    const removeEvent = async (artist, event) => {
        console.log(event)
        let res = await axios.delete(`http://localhost:3001/api/studio/${params.studioId}/delcalendarevent/${artist._id}`, {data: {event:event}})
        pullStudio()
        alert(res.data)
    }

=======
>>>>>>> 00b8178856ef0f42b5d1f37c116a2492ecc435e9
    const { user } = useContext(AuthContext);
    // if (user)console.log(user.name);
    // else{console.log("Not logged in")}
    const location = useLocation()
    const { searchZip } = location.state

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [{ name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }]
    let dayCount = 0
    const calendarWeeks = [0, 1, 2, 3, 4, 5, 6]
    const currentDate = new Date()
    const currentMonth = months[currentDate.getMonth()]
    const currentWeekday = weekdays[currentDate.getDay()]
    const currentDay = currentDate.getDate()
    const startOfMonth = new Date(`${currentMonth.name} 1 2022`)

    let url = window.location.origin

    useEffect(() => {
        pullStudio()

    }, [])
try{
    return (<div id='nice' >
        {/* <Link to="/" className='top-left-corner'>HOME</Link>
        <Link to="/">HOME</Link> */}
<<<<<<< HEAD
        {/* <Link type="button" to={`/query/${searchZip}`} state={{ search: parlour.zip_code }} className="back_btn">Back</Link> */}
=======
        <Link type="button" to={`/query/${searchZip}`} state={{ search: parlour.zip_code }} className="back_btn">Back</Link>
>>>>>>> 00b8178856ef0f42b5d1f37c116a2492ecc435e9
        <div className='center-text studio_container'>
            <h1>{parlour.name}</h1>
            {parlour.artists.map((artist, index) => {
                return (
                    <Link type="button" to={`/${parlour._id}/artist/${artist._id}`} className="artist_cell"> <FaGithubAlt />{artist.name}</Link>
                )
            })}
            <div id="calendarDiv" className='center-text'>
                <h3 className='calendar_month'>{`${currentMonth.name} ${currentDate.getFullYear()}`}</h3>
                <table className='center-table calendar-table'><tbody>
                    {calendarWeeks.map((i, index) => {
                        return (<tr>
                            {weekdays.map((day, j) => {
                                if (i == 0) {
                                    return (<th className='calendar-table calendar_weekday_cell'><p>{day}</p></th>)
                                }
                                else if (i > 0) {
                                    let filldate = new Date(`${currentMonth.name} ${dayCount + 1} 2022`)
                                    let calendarDate = `${filldate.getFullYear()}-${`${filldate.getMonth() + 1}`.padStart(2, "0")}-${`${filldate.getDate()}`.padStart(2, "0")}`
                                    if (i == 1 && j >= startOfMonth.getDay()) {
                                        dayCount++
                                        return (<td className='calendar-table calendar_day_cell'><p className='top-left'>{dayCount}</p>{parlour.artists.map((artist) => {
                                            if (artist.schedule[`week${i}`].includes(filldate.getDay())) {
<<<<<<< HEAD
                                                let m = artist.events.find(o => o.date == calendarDate)
                                                if (m && user) {
                                                    if (m.customer == user.email){
                                                        return (<button className='schedule_button' onClick={() => {removeEvent(artist, m.items)}}>{`Unschedule w/ ${artist.name}`}</button>)
                                                        console.log("Success")
                                                    }
                                                    return
                                                }
                                                return (<Link to={`/${parlour._id}/artist/${artist._id}/schedule`} state={{ date: calendarDate, parlourId: parlour._id, zip_code:searchZip}}><button className='schedule_button'>{`Schedule w/ ${artist.name}`}</button></Link>)
=======
                                                if (artist.events.find(o => o.date == calendarDate)) {
                                                    // console.log(studio)
                                                    return
                                                }
                                                return (<Link to={`/${parlour._id}/artist/${artist._id}/schedule`} state={{ date: calendarDate, parlourId: parlour._id }}><button className='schedule_button'>{`Schedule w/ ${artist.name}`}</button></Link>)
>>>>>>> 00b8178856ef0f42b5d1f37c116a2492ecc435e9
                                            }
                                        })}</td>)
                                    } else if ((i == 1 && j < startOfMonth.getDay()) || (i >= 1 && dayCount >= currentMonth.days)) {
                                        return (<td className='calendar-table calendar_day_cell'></td>);
                                    } else if (i > 1 && dayCount < currentMonth.days) {
                                        dayCount++
                                        return (<td className='calendar-table calendar_day_cell'><p className='top-left'>{dayCount}</p>{parlour.artists.map((artist) => {
                                            if (artist.schedule[`week${i}`].includes(filldate.getDay())) {
<<<<<<< HEAD
                                                let m = artist.events.find(o => o.date == calendarDate)
                                                if (m && user) {
                                                    if (m.customer == user.email){
                                                        return (<button className='schedule_button' onClick={() => {removeEvent(artist, m.items)}}>{`Unschedule w/ ${artist.name}`}</button>)
                                                        console.log("Success")
                                                    }
                                                    return
                                                }
                                                return (<Link to={`/${parlour._id}/artist/${artist._id}/schedule`} state={{ date: calendarDate, parlourId: parlour._id, zip_code:searchZip}}><button className='schedule_button' >{`Schedule w/ ${artist.name}`}</button></Link>)
=======
                                                if (artist.events.find(o => o.date == calendarDate)) {
                                                    return
                                                }
                                                return (<Link to={`/${parlour._id}/artist/${artist._id}/schedule`} state={{ date: calendarDate, parlourId: parlour._id}}><button className='schedule_button' >{`Schedule w/ ${artist.name}`}</button></Link>)
>>>>>>> 00b8178856ef0f42b5d1f37c116a2492ecc435e9
                                            }
                                        })}</td>)
                                    }
                                }
                            })}</tr>)
                    })}

                </tbody></table></div>
        </div >
    </div>)
}
catch(er){
<<<<<<< HEAD
    console.log(er)
=======
>>>>>>> 00b8178856ef0f42b5d1f37c116a2492ecc435e9
    return (<div>Please wait while the page loads</div>)
}
}

export default Studio;