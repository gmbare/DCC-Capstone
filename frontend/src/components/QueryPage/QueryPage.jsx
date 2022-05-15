import React, { useState } from 'react';
import "./QueryPage.css"

const QueryPage = (props) => {
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
                        <button key={indexLower} className="upper_parlour_button" id={`parlour${indexLower}-${parlour.zip_code}_upper`} onClick={() => {
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
                            <p>Artists:</p>
                        </div>
                    </div>)
                })}</div>)
        })}
    </div> );
}
 
export default QueryPage;