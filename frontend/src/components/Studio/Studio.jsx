import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import "./Studio.css"

// var options = {month: 'long'}
const Studio = (props) => {
    const location = useLocation()
    const { parlour,
        searchZip } = location.state

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
    const testDate = new Date(`${currentMonth.name} 1 2022`)

    let url = window.location.origin

    return (<div id='nice' className='center-text'>
        {/* <Link to="/" className='top-left-corner'>HOME</Link>
        <Link to="/">HOME</Link> */}
        <Link to={`/query/${searchZip}`}state={{search:parlour.zip_code}}>Back</Link>
        <h1>{parlour.name}</h1>
        {parlour.artists.map((artist, index) => {
            return (
                <Link type="button" to={`/${parlour._id}/artist/${artist._id}`}> <p><FaGithubAlt /></p><h2>{artist.name}</h2>
                    </Link>
            )
        })}
        <div id="calendarDiv" className='center-text'>
            <h3>{`${currentMonth.name} ${currentDate.getFullYear()}`}</h3>
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
                                if (i == 1 && j >= testDate.getDay()) {
                                    dayCount++
                                    return (<td className='calendar-table calendar_day_cell'><p className='top-left'>{dayCount}</p>{parlour.artists.map((artist) => {
                                        if (artist.schedule[`week${i}`].includes(filldate.getDay())) {
                                            if (artist.events.includes({ date: filldate.toString().replace(' ', '-') })) {
                                                return
                                            }
                                            if (artist.events.find(o => o.date == calendarDate)) {
                                                return
                                            }
                                            return (<button className='schedule_button'>{`Schedule w/ ${artist.name}`}</button>)
                                        }
                                    })}</td>)
                                } else if ((i == 1 && j < testDate.getDay()) || (i >= 1 && dayCount >= currentMonth.days)) {
                                    return (<td className='calendar-table calendar_day_cell'></td>);
                                } else if (i > 1 && dayCount < currentMonth.days) {
                                    dayCount++
                                    return (<td className='calendar-table calendar_day_cell'><p className='top-left'>{dayCount}</p>{parlour.artists.map((artist) => {
                                        if (artist.schedule[`week${i}`].includes(filldate.getDay())) {
                                            if (artist.events.find(o => o.date == calendarDate)) {
                                                return
                                            }
                                            return (<button className='schedule_button' >{`Schedule w/ ${artist.name}`}</button>)
                                        }
                                    })}</td>)
                                }
                            }
                        })}</tr>)
                })}

            </tbody></table></div>

    </div>)
}

export default Studio;