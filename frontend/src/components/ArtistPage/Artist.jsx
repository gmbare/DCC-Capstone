import React, { useEffect, useState, useContext} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaGithubAlt } from "react-icons/fa"
import AuthContext from "../../context/AuthContext";
import{FaStar} from 'react-icons/fa'
import "./Artist.css"
import axios from 'axios';

const ArtistPage = (props) => {
    const {user } = useContext(AuthContext);
    const [artist, setArtist] = useState()
    const [stars, setStars] = useState()
    const params = useParams()
    const pullArtist = async (req) => {
        let res = await axios.get(`http://localhost:3001/api/artist/${params.studioId}/findartist/${params.artistId}`)
        setArtist(res.data)
        console.log(res.data)
    }

    const handleSubmitReview = async (e) => {
        try {
            let name = document.getElementById('name_field').value
            let email = document.getElementById('email_field').value
            if (!document.getElementById('name_field').value){
                name = "anonymoose"
            }
            if(!document.getElementById('email_field').value){
                email = "anonymouse@mysterious.stranger"
            }
            let res = await axios.put(`http://localhost:3001/api/artist/${params.studioId}/reviewartist/${params.artistId}`, { text:document.getElementById('reviewText').value, rating:stars, raterName: name, raterEmail:email})
            console.log(res.data)
        } catch (er) {
            console.log(er)
        }
        pullArtist()
    }

    function colorStars(){
        try{
            for (let i = 1;i < 6; i++){
                document.getElementById(`starL-${i}`).className = "starlabel"
            }
            for (let i = 1;i <= stars;i++){
                console.log(i)
                document.getElementById(`starL-${i}`).className = "starlabel Highlighted"
            }      
        }
        catch{
            console.log("Page not set yet")
        }
    }

    useEffect(
        () => {
            pullArtist()
        }, [])

        useEffect(
            () => {
                colorStars()
            }, [stars])


    try {
        return (<div className='aboutpage_container'>
            {/* <Link to="/">HOME</Link><br/><br/> */}
            <h1>Hi!<br />My name is {artist.name}</h1>
            <p className='aboutme_text'>About Me: {artist.about.description}</p>
            Reviews: {artist.about.reviews.map(review => {
                return (<div className="review_split"><p>{review.rating} stars- {review.text}<br/>{review.raterName}<br/>{review.raterEmail}</p></div>)
            })}<br />
            <button onClick={() => {
                if (document.getElementById("reviewPage").className == "hidden_review") {
                    document.getElementById("reviewPage").className = "shown_review"
                } else if (document.getElementById("reviewPage").className == "shown_review") {
                    document.getElementById("reviewPage").className = "hidden_review"
                }
            }}>Leave a Review!</button>
            <div className='hidden_review' id='reviewPage'><br />
                <div className="starholder">
                    <form id={`star_rating`}>
                        <label htmlFor={`star-1`} id={`starL-1`} className="starlabel"><FaStar /></label>
                        <input id={`star-1`} className="star" name={`star_rating`} type="radio" value={`1`} onChange={(event) => setStars(1)} />
                        <label htmlFor={`star-2`} id={`starL-2`} className="starlabel"><FaStar /></label>
                        <input id={`star-2`} className="star" name={`star_rating`} type="radio" value={`2`} onChange={(event) => setStars(2)}/>
                        <label htmlFor={`star-3`} id={`starL-3`} className="starlabel"><FaStar /></label>
                        <input id={`star-3`} className="star" name={`star_rating`} type="radio" value={`3`} onChange={(event) => setStars(3)}/>
                        <label htmlFor={`star-4`} id={`starL-4`} className="starlabel"><FaStar /></label>
                        <input id={`star-4`} className="star" name={`star_rating`} type="radio" value={`4`} onChange={(event) => setStars(4)} />
                        <label htmlFor={`star-5`} id={`starL-5`} className="starlabel"><FaStar /></label>
                        <input id={`star-5`} className="star" name={`star_rating`} type="radio" value={`5`} onChange={(event) => setStars(5)} />
                    </form>
                </div>
                <textarea className='review-text-box' id="reviewText" placeholder='Please write your review here'></textarea>
                {function(){
                     if (user){
                        console.log("um")
                        return (<div>
                        <br />NAME:<input type="text" placeholder='Name' id="name_field" value={user.name} disabled></input>
                        <br />EMAIL:<input type="text" placeholder='Email' id="email_field" value={user.email} disabled></input>
                        </div>)}
                    return (<div>
                        <br />NAME:<input type="text" placeholder='Name' id="name_field"></input>
                        <br />EMAIL:<input type="text" placeholder='Email' id="email_field"></input>
                        </div>)
                }()}
                <br /><button onClick={(e) => { handleSubmitReview() }}>Submit Review</button>
            </div>
        </div>);
    } catch (er) {
        return (<div>Please wait while the page loads</div>)
    }
}

export default ArtistPage;