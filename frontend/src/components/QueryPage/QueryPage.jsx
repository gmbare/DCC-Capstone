import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import QueryPageBottom from '../QueryPageBottom/QueryPageBottom';
import { FaSearch } from "react-icons/fa"
import { MdLocationSearching } from "react-icons/md"
import axios from 'axios'
import getCurrentPosition from "../../utils/GeoLocator"

var parseString = require('xml2js').parseString;


const QueryPage = (props) => {

    let url = window.location.origin
    const params = useParams()
    const [parlours, setParlours] = useState([])

    const handleSubmission = async (e) => {
        let text = params.zip_code
        // document.getElementById('return').textContent = zipSearch
        if (text) {
            await axios.get(`http://api.geonames.org/postalCodeSearch?postalcode=${text}&maxRows=10&country=US&username=bareg`)
                .then(response => {
                    parseString(response.data, function (err, result) {
                        if (parseInt(result.geonames.totalResultsCount) > 0) {
                                document.getElementById('return').textContent = `${result.geonames.code[0].name[0]}, ${result.geonames.code[0].adminName1[0]}, ${result.geonames.code[0].countryCode[0]}`
                            findParlour(result.geonames.code[0].postalcode[0])
                        }
                        else if (parseInt(result.geonames.totalResultsCount) === 0) {
                            document.getElementById('return').textContent = `No Parlours found for ZipCode of: ${text}`
                            
                            setParlours([])
                        }
                    })
                })
        }
    }

    const handleLocation = async (e) => {
        e.preventDefault()
        let test = await (getCurrentPosition());
        console.log(test)
        await axios.get(`http://api.geonames.org/findNearbyPostalCodes?lat=${test.latitude}&lng=${test.longitude}&maxRows=1&username=bareg`)
            .then(response => {
                parseString(response.data, function (err, result) {
                    window.location.assign(`${url}/query/${result.geonames.code[0].postalcode[0]}`)
                })
            })
    }



    const findParlour = async (zip_code) => {
        setParlours(await axios.get(`http://localhost:3001/api/studio/findparlour/${zip_code}`).then(response => { console.log(response.data); return response.data }))
    }


    const handleInput = (input) => {
        if (input.code === 'Enter') {
            window.location.assign(`${url}/query/${document.getElementById('zip_code_query').value}`)
        }
    }

    useEffect(
        () => {handleSubmission()
        }, [])

    return (<div className='querypage_div'>
        {/* <div><Link to="/">Home</Link></div> */}
        <div className='search_query_div'>
            <p id="return"></p>
            <button className='btn-size-5r' onClick={e => handleLocation(e)}><MdLocationSearching className='font-size-5r' /></button> <input type='text' id='zip_code_query' placeholder={`Please input a Zip Code`} className='box-size-5r' onKeyDown={(e) => handleInput(e)}></input><button className='btn-size-5r' onClick={handleSubmission}><FaSearch className='font-size-5r' /></button>
        </div>
        <div>
            <QueryPageBottom parlours={parlours} searchZip={params.zip_code} />
        </div>
        <div className='login_register_div'>
            <p>Insert Anchors that allow you to login, or take you to register page</p>
        </div>
    </div>)
}

export default QueryPage;