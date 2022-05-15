import React, { useEffect, useState } from 'react';
import "./LandingPage.css"
import {FaSearch} from "react-icons/fa"
import {MdLocationSearching} from "react-icons/md"
import axios from 'axios'
import QueryPage from '../../components/QueryPage/QueryPage';
import getCurrentPosition from "../../utils/GeoLocator"

// var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;

const LandingPage = () => {

    const [zipSearch, setZipSearch] = useState()
    const [parlours, setParlours] = useState([])

    const handleSubmission = async (e) => {
        let text = document.getElementById('zip_code_query').value
        console.log(text)
        document.getElementById('return').textContent = zipSearch
        if (text){
        await axios.get(`http://api.geonames.org/postalCodeSearch?postalcode=${text}&maxRows=10&country=US&username=bareg`)
        .then(response => {
            parseString(response.data, function (err, result) {
                // console.log(result)
                if (parseInt(result.geonames.totalResultsCount) > 0){
            // console.log(result);
                setZipSearch(result);
                findParlour(result.geonames.code[0].postalcode[0])
                }
                else if (parseInt(result.geonames.totalResultsCount) == 0){
                    setZipSearch()
                    setParlours([])
                }
        })})
    }}



    const findParlour = async (zip_code) => {
        setParlours(await axios.get(`http://localhost:3001/api/studio/findparlour/${zip_code}`).then(response => {console.log(response.data);return response.data}))
    }

    const handleLocation = async (e) => {
        
        e.preventDefault()
        let test = await (getCurrentPosition());
        console.log(test)
        await axios.get(`http://api.geonames.org/findNearbyPostalCodes?lat=${test.latitude}&lng=${test.longitude}&maxRows=1&username=bareg`)
        .then(response => {
            parseString(response.data, function (err, result) { 
                // console.log(result)
                console.log(result)
            // console.log(result);
                setZipSearch(result);
                console.log(result.geonames.code[0].postalcode[0])
                findParlour(result.geonames.code[0].postalcode[0],result)
        })
    })
}

    const handleInput = (input) => {
        // input.preventDefault()
        // console.log(input.code)
        // let numberInput = /Digit\d/g
        // let textInput = /Key\w/gi
        // if (numberInput.exec(input.code)){
            // document.getElementById('zip_code_query').value = `${textHolder}${input.code.substring(input.code.length -1)}`
            // console.log("Check")
        // }
        if (input.code == 'Enter'){
            handleSubmission()
        }
        // else if (textInput.exec(input.code)){
        //     input.preventDefault()
        //     console.log("Nah")
        // }
    }

    useEffect(
        () => {
            if (zipSearch){
                console.log(zipSearch)
                
                document.getElementById('return').textContent = `${zipSearch.geonames.code[0].name[0]}, ${zipSearch.geonames.code[0].adminName1[0]}, ${zipSearch.geonames.code[0].countryCode[0]}`
            }            
            else if(!zipSearch){
                document.getElementById('return').textContent = ("Nothing found for that ZipCode")
            }
            },[zipSearch])


    return (  
        <div className='landingpage_container'>
            <div className='search_query_div'>
                <p id="return"></p>
            <button className='btn-size-5r' onClick={e => handleLocation(e)}><MdLocationSearching className='font-size-5r'/></button> <input type='text' id='zip_code_query'placeholder={`Please input a Zip Code`} className='box-size-5r' onKeyDown={(e) => handleInput(e)}></input><button className='btn-size-5r' onClick={handleSubmission }><FaSearch className='font-size-5r'/></button>
            </div>
            <div>
                <QueryPage parlours={parlours}/>
            </div>
            <div className='login_register_div'>
            <p>Insert Anchors that allow you to login, or take you to register page</p>
            </div>
        </div>
    );
}
 
export default LandingPage;