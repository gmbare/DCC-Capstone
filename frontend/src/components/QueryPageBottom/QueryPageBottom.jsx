import React, { useState } from 'react';
import "./QueryPageBottom.css"
import {FaGithubAlt} from "react-icons/fa"
// import Calendar from '../Calendar/Calendar';
import { Link, useLocation} from "react-router-dom";
// const {calendar} = require ("../Calendar/Calendar")

const QueryPageBottom = (props) => {





    // let parlourMaintenance = {}
    console.log(props)
    return ( <div>
        {props.parlours.map((zipParlour, indexUpper)=> {
            // console.log(zipParlour)
            return(
                <div key={indexUpper}>
                    {zipParlour[0].zip_code}{
                zipParlour.map((parlour, indexLower) => {
                    return ( 
                    <div>
                        
                        <Link type="button" className='upper_parlour_button' to={`/studio/${parlour._id}`} state={{parlour:parlour, searchZip:props.searchZip}}>{parlour.name} </Link>
                        {/* <button key={indexLower} className="upper_parlour_button" id={`parlour${indexLower}-${parlour.zip_code}_upper`} textContent={`${parlour.name} \\/`} onClick={() => {
                            if (document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent[document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent.length -1] == '/'){
                                console.log("opening")
                                document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent = `${parlour.name}  /\\`
                                document.getElementById(`parlour${indexLower}-${parlour.zip_code}_info`).className = `shown_query`
                            }
                            else if (document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent[document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent.length -1] == '\\'){
                                console.log("closing")
                                document.getElementById(`parlour${indexLower}-${parlour.zip_code}_upper`).textContent = `${parlour.name}  \\/`
                                document.getElementById(`parlour${indexLower}-${parlour.zip_code}_info`).className = `hidden_query`
                            }
                        }}>
                        {parlour.name}  \/
                        </button>
                        <div key={`Info-${indexLower}`} className='hidden_query' id={`parlour${indexLower}-${parlour.zip_code}_info`}>
                            Artists:{parlour.artists.map((artist,index) => {
                                // console.log(artist.calendar.id.replace('@','%40'))
                                return (
                                    <div>
                                    <p><FaGithubAlt/></p>
                                    <Link type="button" className='upper_parlour_button' to={`/Scheduling`} state={{artist:artist, parlour:parlour, searchZip:props.searchZip}}>{artist.name} </Link>
                                </div>)
                            })}
                        </div> */}
                    </div>)
                })}</div>)
        })}
    </div> );
}
 
export default QueryPageBottom;