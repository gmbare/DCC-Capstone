import React, { useState } from 'react';
import "./LandingPage.css"
import {FaSearch} from "react-icons/fa"
import {MdLocationSearching} from "react-icons/md"
import axios from 'axios'
// var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

const LandingPage = () => {


    const handleSubmission = async (text) => {
        let zipSearch = "Nothing found for that ZipCode"
        document.getElementById('return').textContent = zipSearch
        if (text){
        await axios.get(`http://api.geonames.org/postalCodeSearch?postalcode=${text}&maxRows=10&country=US&username=bareg`)
        .then(response => {
            parseString(response.data, function (err, result) {
                // console.log(result)
                if (parseInt(result.geonames.totalResultsCount) > 0){
            // console.log(result);
            zipSearch = result;
                }
        })});
        console.log(`${zipSearch.geonames.code[0].postalcode[0]}`)
        let test = await axios.get(`http://localhost:3001/api/studio/findparlour/${text}`)
        console.log(test.data)
        document.getElementById('return').textContent = `${zipSearch.geonames.code[0].name[0]}, ${zipSearch.geonames.code[0].adminName1[0]}, ${zipSearch.geonames.code[0].countryCode[0]}`
    }


    }

    const handleInput = (input) => {
        // input.preventDefault()
        // console.log(input.code)
        let textHolder = document.getElementById('zip_code_query').value
        // let numberInput = /Digit\d/g
        // let textInput = /Key\w/gi
        // if (numberInput.exec(input.code)){
            // document.getElementById('zip_code_query').value = `${textHolder}${input.code.substring(input.code.length -1)}`
            // console.log("Check")
        // }
        if (input.code == 'Enter'){
            handleSubmission(textHolder)
        }
        // else if (textInput.exec(input.code)){
        //     input.preventDefault()
        //     console.log("Nah")
        // }
    }



    return (  
        <div className='landingpage_container'>
            <div className='search_query_div'>
            <button className='btn-size-5r'><MdLocationSearching className='font-size-5r'/></button> <input type='text' id='zip_code_query'placeholder={`Please input a Zip Code`} className='box-size-5r' onKeyDown={(e) => handleInput(e)}></input><button className='btn-size-5r'><FaSearch className='font-size-5r'/></button>
            </div>
            <div>
                <p id="return"></p>
            </div>
            <div className='login_register_div'>
                Insert Anchors that allow you to login, or take you to register page
            </div>
        </div>
    );
}
 
export default LandingPage;