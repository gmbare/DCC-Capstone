import React, { useState } from 'react';

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

const open_days = [1, 2, 4, 5]
let calendar = new Array(months.length)
        
        function testicle(chosenMonth) {

        let dayCount = 1
        const currentDate = new Date(`${months[chosenMonth].name} 1 2022`)
        const currentMonth = months[currentDate.getMonth()]
        const currentWeekday = weekdays[currentDate.getDay()]
        const currentDay = currentDate.getDate()
        const testDate = new Date(`${currentMonth.name} 1 2022`)
        let discretion = ''
    
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
                            discretion += (`<td>${dayCount}<br /><button>Schedule</button></td>`)
                        }
                        return (<td>{`${dayCount}\n`}</td>)
                    } else if ((i == 1 && j < testDate.getDay()) || (i >= 1 && dayCount > currentMonth.days)) {
                        discretion += (`<td></td>`);
                    } else if (i > 1 && dayCount <= currentMonth.days) {
                        if (open_days.includes(filldate.getDay())) {
                            discretion += (`<td>${dayCount}<br /><button>Schedule</button></td>`)
                        }
                        dayCount++
                        discretion += (`<td>${dayCount}\n</td>`)
                    }
                }
            }
    
            discretion += `</tr>`
            console.log(discretion)
        }
        // </tr>)
        console.log("um")
        return (<div><h3>{currentMonth.name}</h3>
            <table>
            </table>
        </div>)
        }


        return (<div id="Nice?">
            {testicle(4)}
        </div>);
    }

    export default Calendar;