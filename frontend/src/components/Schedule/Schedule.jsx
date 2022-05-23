import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import AuthContext from '../../context/AuthContext';
import "./Schedule.css"
import axios from 'axios';

const Schedule = (props) => {
    const {user} = useContext(AuthContext)
    const [aboutArtist, setAboutArtist] = useState()
    const params = useParams()
    const location = useLocation()
    const {date} = location.state
    const pullArtist = async (req) => {
        let res = await axios.get(`http://localhost:3001/api/artist/${params.studioId}/findartist/${params.artistId}`)
        setAboutArtist(res.data.about)
        // console.log(res.data)
    }

    const handleScheduleSubmit = async (e) => {
        // let newDate = `${date.getFullYear()}-${`${date.getMonth() +1}`.padStart(2, "0")}-${`${date.getDay()}`.padStart(2, "0")}`
        console.log(date)
        let body = {summary:`Tattoo Appointment for ${user.name}`, description:`Name: ${user.name}\nEmail:${user.email}\nNumber:N/A`, date:date, customer:user, sendUpdates:"all"}
        let res = await axios.put(`http://localhost:3001/api/studio/${params.studioId}/${params.artistId}/addcalendarevent`, body)
        console.log(res.data)
        // console.log(body)


    }

    function pullSelect(e) {
        try {
            let test = document.getElementById('type_apt');
            let value = test.options[test.selectedIndex].value;
            console.log(value)
            return (value)
        } catch (er) {
            console.log("Please wait")
        }
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
        return (<div>
            {/* <Link to="/">HOME</Link><br/><br/> */}
            Scheduling appt for <br />
            <select id="type_apt" onChange={(e) => { pullSelect(e) }} >
                {/* <select id="type_apt" > */}
                <option value="appraisal_select">Appraisal</option>
                <option value="design_select">Design</option>
                <option value="inking_select">Inking</option>
            </select><br />
            <button onClick={() => {handleScheduleSubmit()}}>Schedule</button>
        </div>);
    } catch (er) {
        console.log(er)
        return (<div> <p>Please wait while the page loads</p></div>)
    }
}

export default Schedule;