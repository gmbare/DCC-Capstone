import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// var options = {month: 'long'}
const Calendar = (props) => {
        
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
const calendarWeeks = [0,1,2,3,4,5,6]
const currentDate = new Date()
const currentMonth = months[currentDate.getMonth()]
const currentWeekday = weekdays[currentDate.getDay()]
const currentDay = currentDate.getDate()
const testDate = new Date(`${currentMonth.name} 1 2022`)

const open_days = [1, 2, 4, 5]
        
        function calendarCreation(monthly) {

        let dayCount = 0
        let discretion = `<h3>${currentMonth.name}</h3><table><tbody>`
            
        for (let i = 0; i <= 7; i++) {
            discretion += `<tr>`
            for (let j in weekdays) {
                if (i == 0) {
                    discretion += `<th>${weekdays[j]}</th>`
                }
                else if (i > 0) {
                    let filldate = new Date(`${currentMonth.name} ${dayCount} 2022`)
                    if (i == 1 && j >= testDate.getDay()) {
                        dayCount++
                        if (open_days.includes(filldate.getDay())) {
                            discretion += `<td>${dayCount}<button>Schedule</button></td>`
                        }
                        else{
                            discretion += (`<td>${dayCount}\n</td>`)
                        }
                    } else if ((i == 1 && j < testDate.getDay()) || (i >= 1 && dayCount > currentMonth.days)) {
                        discretion += `<td></td>`;
                    } else if (i > 1 && dayCount <= currentMonth.days) {
                        dayCount++
                        if (open_days.includes(filldate.getDay())) {
                            discretion += `<td>${dayCount}<button>Schedule</button></td>`
                        }
                        else{
                            discretion += `<td>${dayCount}\n</td>`
                        }
                    }
                }
            }
            discretion += `</tr>`
            // console.log(discretion)
        }
        // console.log(discretion)
        // </tr>)
        discretion += '</tbody></table>'
        // document.getElementById("monthName").innerText = currentMonth.name
        // document.getElementById("nice").innerHTML = discretion

        // try{
        //     console.log(discretion)
        //     document.getElementById("calendarDiv").innerHTML = `${discretion}`
        // }catch(er){
        //     console.log("UGH")
        // }
        }
        console.log("test")
        return (<div id='nice'>
            <Link to="/">HOME</Link><div id="calendarDiv"></div>
            {/* {calendarCreation()} */}
            <h3>{currentMonth.name}</h3>
            <table><tbody>
                {calendarWeeks.map((i, index)=> {
                    return (<tr>
                        {weekdays.map((day,j)=> {
                if (i == 0) {
                    return (<th>{day}</th>)
                } 
                else if (i > 0) {
                    let filldate = new Date(`${currentMonth.name} ${dayCount} 2022`)
                    if (i == 1 && j >= testDate.getDay()) {
                        dayCount++
                        if (open_days.includes(filldate.getDay())) {
                            return(<td>{dayCount}<button>Schedule</button></td>)
                        }
                        else{
                            return(<td>{dayCount}</td>)
                        }
                    } else if ((i == 1 && j < testDate.getDay()) || (i >= 1 && dayCount > currentMonth.days)) {
                        return(<td></td>);
                    } else if (i > 1 && dayCount <= currentMonth.days) {
                        dayCount++
                        if (open_days.includes(filldate.getDay())) {
                            return(<td>{dayCount}<button>Schedule</button></td>)
                        }
                        else{
                            return(<td>{dayCount}</td>)
                        }
                    }
                }
                })}</tr>)
                })}
                    
            </tbody></table>
            
        </div>)
    }

    export default Calendar;