import React, { useEffect, useState } from 'react';
import { Link, useLocation,useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import "./Artist.css"
import axios from 'axios';

const ArtistPage = (props) => {
    const [artist, setArtist] = useState()
    const params = useParams()
    const pullArtist = async (req) => {
        let res = await axios.get(`http://localhost:3001/api/artist/${params.studioId}/findartist/${params.artistId}`)
        setArtist(res.data)
        console.log(res.data)
    }


    useEffect(
        () => {pullArtist()
        }, [])


        try{
            return (<div>
                {/* <Link to="/">HOME</Link><br/><br/> */}
                <h1>Hi!<br/>My name is {artist.name}</h1>
                About Me: {artist.about.description}<br/><br/>
                Reviews: {artist.about.reviews.map(review => {
                    <div>review!</div>
                })}<br/>
                <button onClick={() => {if (document.getElementById("reviewPage").className == "hidden_review"){
                    document.getElementById("reviewPage").className = "shown_review"
                }else if (document.getElementById("reviewPage").className == "shown_review"){
                    document.getElementById("reviewPage").className = "hidden_review"
                }
                }}>Leave a Review!</button>
                <div className='hidden_review' id='reviewPage'><br/><textarea  className='review-text-box' placeholder='Please write your review here'></textarea>
                                                        <br/>NAME:<input type="text" placeholder='Name'></input><br/>EMAIL:<input type="text" placeholder='Email'></input></div>
                </div>);
        }catch(er){
            return (<div>Please wait while the page loads</div>)
        }
}
 
export default ArtistPage;