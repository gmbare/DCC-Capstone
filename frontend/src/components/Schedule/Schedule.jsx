import React, { useEffect, useState } from 'react';
import { Link, useLocation,useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import "./Schedule.css"
import axios from 'axios';

const Schedule = (props) => {
    const [aboutArtist, setAboutArtist] = useState()
    const params = useParams()
    const pullArtist = async (req) => {
        let res = await axios.get(`http://localhost:3001/api/artist/${params.studioId}/findartist/${params.artistId}`)
        setAboutArtist(res.data.about)
        console.log(res.data)
    }


    useEffect(
        () => {pullArtist()
        }, [])


        try{
            return (<div>
                {/* <Link to="/">HOME</Link><br/><br/> */}
                About Me: {aboutArtist.description}<br/><br/>
                Reviews: {aboutArtist.reviews.map(review => {
                    <div>review!</div>
                })}<br/>
                <button>Leave a Review</button>
                </div>);
        }catch(er){
            return (<div>Please wait while the page loads</div>)
        }
}
 
export default Schedule;