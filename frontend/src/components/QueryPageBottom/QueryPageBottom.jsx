import React, { useState } from 'react';
import "./QueryPageBottom.css"
import {FaGithubAlt} from "react-icons/fa"
// import Calendar from '../Calendar/Calendar';
import { Link, useLocation} from "react-router-dom";
// const {calendar} = require ("../Calendar/Calendar")

const QueryPageBottom = (props) => {

    // let parlourMaintenance = {}
    console.log(props)
    return ( <div className='bottom_query_div'>
        {props.parlours.map((zipParlour, indexUpper)=> {
            // console.log(zipParlour)
            return(
                <div key={indexUpper}>
                    <h3 className='zip_code'>{zipParlour[0].zip_code}</h3>{
                zipParlour.map((parlour, indexLower) => {
                    return ( 
                    <div>
                        <Link  to={`/studio/${parlour._id}`} state={{parlour:parlour, searchZip:props.searchZip}}><button className='upper_parlour_button'>{parlour.name}</button></Link>
                    </div>)
                })}</div>)
        })}
    </div> );
}
 
export default QueryPageBottom;