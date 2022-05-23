import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import AuthContext from '../../context/AuthContext';
import "./Schedule.css"
import axios from 'axios';
import FormData from 'form-data'

const Schedule = (props) => {
    const {user} = useContext(AuthContext)
    const [aboutArtist, setAboutArtist] = useState()
    const params = useParams()
    const location = useLocation()
    const {date} = location.state
    const {parlourId} = location.state
    const pullArtist = async (req) => {
        let res = await axios.get(`http://localhost:3001/api/artist/${params.studioId}/findartist/${params.artistId}`)
        setAboutArtist(res.data.about)
        // console.log(res.data)
    }

    const handleScheduleSubmit = async (e) => {
        if (document.getElementById('name_field').value == '' || document.getElementById('email_field').value == ''){
            alert("Please ensure you fill out the form in its entirety")
            return
        }
        var bodyFormData = new FormData();
        let userType
        try{
            userType = user
        }
        catch{
            userType = {name:document.getElementById('name_field').value, email: document.getElementById('email_field').value}
        }
        
        bodyFormData.append('image', document.getElementById("imageUpload").files[0])
        bodyFormData.append('summary',`Tattoo Appointment for ${document.getElementById('name_field').value}`)
            bodyFormData.append( 'description',`Name: ${document.getElementById('name_field').value}\nEmail:${document.getElementById('email_field').value}\nNumber:N/A`)
                bodyFormData.append('date',date)
                bodyFormData.append('customer',user)
                    bodyFormData.append('sendUpdates',"all")
        console.log(bodyFormData.get('image'))
        // let newDate = `${date.getFullYear()}-${`${date.getMonth() +1}`.padStart(2, "0")}-${`${date.getDay()}`.padStart(2, "0")}`
        console.log(date)
        // let body = {
        //     summary:`Tattoo Appointment for ${user.name}`,
            //  description:`Name: ${user.name}\nEmail:${user.email}\nNumber:N/A`,
            //   date:date, customer:user, 
            //   sendUpdates:"all"}
        let res = await axios({method:'put', url:`http://localhost:3001/api/studio/${params.studioId}/${params.artistId}/addcalendarevent`, data: bodyFormData,headers: { "encType": "multipart/form-data" },
    })
        console.log(res.data)
        alert(`You have been scheduled for ${date}, please monitor your email for further information.\nYou will now be returned to the home page`)
        document.location.href = (`/`)
        // console.log(body)
    }

    function pullSelect(e) {
        try {
            let test = document.getElementById('type_apt');
            let value = test.options[test.selectedIndex].value;
            if (value == ("inking_select" || "appraisal_select")){
                return (<div>Hello Hello</div>)
            }
            console.log(value)
            return (value)
        } catch (er) {
            console.log("Please wait")
        }
    }

function test() {
    console.log(parlourId)
}



    useEffect(
        () => {
            pullArtist()
            console.log(user)
        }, [])

    useEffect(
        () => {
            pullSelect()
        }, [])


    try {
        return (<div className='schedule_container' id="schedule_container">
            {/* <Link to="/">HOME</Link><br/><br/> */}
           {function(){
                     if (user){
                        console.log("um")
                        return (<div> Scheduling appt for 
                        <br />NAME:<input type="text" placeholder='Name' id="name_field" value={user.name} disabled></input>
                        <br />EMAIL:<input type="text" placeholder='Email' id="email_field" value={user.email} disabled></input>
                        </div>)}
                    return (<div> Scheduling appt for 
                        <br />NAME:<input type="text" placeholder='Name' id="name_field"></input>
                        <br />EMAIL:<input type="text" placeholder='Email' id="email_field"></input>
                        </div>)
                }()}
            {/* <select className='schedule_type' id="type_apt" onChange={(e) => { pullSelect(e) }} > */}
            <select className='schedule_type' id="type_apt" onChange={(e) => {
            let test = document.getElementById('type_apt');
            let value = test.options[test.selectedIndex].value;
            document.getElementById('imageUpload_div').className = "hide"
            if (value == "inking_select" ||value == "appraisal_select"){
                document.getElementById('imageUpload_div').className = "shown"
            } }} >
                {/* <select id="type_apt" > */}
                <option value="appraisal_select">Appraisal</option>
                <option value="design_select">Design</option>
                <option value="inking_select">Inking</option>
            </select><br />
            <div id="imageUpload_div"  className='shown'>
            <input type="file" id="imageUpload" accept="image/pngm image/jpeg, image/jpg"/>

            </div>
            <button onClick={() => {handleScheduleSubmit()}} className="schedule_button">Schedule</button>
            {/* <button onClick={() => {test()}} className="schedule_button">Schedule</button> */}
        </div>);
    } catch (er) {
        console.log(er)
        return (<div> <p>Please wait while the page loads</p></div>)
    }
}

export default Schedule;