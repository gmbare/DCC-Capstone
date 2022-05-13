
import axios from 'axios'

let test

function error() {
    alert('Sorry, no position available.');
  }
  
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

async function success(pos) {
    // var crd = pos.coords;
    test = await pos.coords
    return test
    // return(pos.coords)
  }
  

 const getCurrentPosition = async () => {
   var prom1 = new Promise(function (resolve, reject){
    navigator.geolocation.getCurrentPosition(function(pos){
      resolve(pos)
    }, error, options)
   })
   return (prom1.then(function(value){
    //  console.log(value)
     return value.coords
   }))
 }

export default getCurrentPosition;