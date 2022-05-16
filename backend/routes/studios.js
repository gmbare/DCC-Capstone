const {Studio, validateStudio, studioSchema} = require("../models/studio");
const {User, validateUser} = require("../models/customer.js")
// const {main, refreshList} = require("../db/googleAPI")
// const calendar = getAuth()
const bcrypt = require("bcrypt");
const express = require('express');
const { validateArtist, Artist } = require("../models/artist");
const { google } = require("googleapis");
const router = express.Router()

async function main() {
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });
  const authClient = await auth.getClient();
  const calendar = google.calendar({ version: 'v3', auth: authClient })


  async function refreshList() {
    // console.log(calendar)
    const res = await (calendar.calendarList.list())
    console.log(res.data)
    return (res.data)
  }

  
async function clearAllCalendar(calendarList) {
  calendarList.map(async entry => {
    await calendar.calendars.delete(
      { calendarId: entry.id }
    )
  })
  console.log(calendarList)
}

async function removeCalendar(calendar_id){
  await calendar.calendars.delete({
    calendarId: calendar_id
  })
}


async function addEvent(calendar_id, summary='basic summary', description='basic description'){
  await calendar.events.insert({
    calendarId:calendar_id,
    summary:summary,
    description:description
  })
}

async function listEvents(calendar_id){
  return await calendar.events.list({calendarId:calendar_id})
}

async function addCalendar(summ = "My_Summary", description = "my_description") {
  const res = await calendar.calendars.insert({
    // Request body metadata
    requestBody: {
      "summary": summ,
      "description": description,
    },
  });
  return (res.data)
}



router.post("/registernewstudio", async (req, res) => {
try{
    console.log(req.body)
    const {error} = validateStudio(req.body);
    if (error) return res.send(`${error}`)
    let studio = await Studio.findOne({address: req.body.address})
    if (studio) return res.send(`That address is already registered as an existing tatto studio. If you feel this is in error please reach out to us at FictionalEmail@BareSkinProblems.com`)

    studio = new Studio({
        name: req.body.name,
        zip_code: req.body.zip_code,
        address: req.body.address
    })
    await studio.save()
    return res.send(`Successfully added ${req.body.name} to the roster of Tattoo studios`)
}catch (err) {
    return res.send(`Sorry we ran into an internal error of:\n${err}`)
}
})


router.post("/registernewcustomer",
// fileUpload.single("image"),
async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/registernewartist/:studioId", async(req, res) => {
    try{
        const {error} = validateArtist(req.body);
        if (error) return res.send(`${req.body}\n\n${error}`)
        let studio = await Studio.findById(req.params.studioId)
        let calendar = await addCalendar(`${req.params.studioId}&${req.body.name}`, `Calendar for ${req.body.name} of ${studio.name}`)
        let artist = new Artist({
            name: req.body.name,
            calendar: calendar
        })
        studio.artists.push(artist)
        await studio.save()
        return res.send(`Artist: ${req.body.name} succesfully added to roster of ${studio.name}`)
    }catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

router.delete("/removeartist/:studioId/:artist_id", async (req, res) => {
  try{
    console.log('test')
        let studio = await Studio.findById(req.params.studioId)
        studio.artists.map((artist,index) => {
          if (artist.id == req.params.artist_id){
            removeCalendar(artist.calendar.id)
            studio.artists.splice(index, 1)
          }
        })
        await studio.save()
        return res.send(`Artist: ${req.params.artist_id} succesfully removed from roster of ${studio.name}`)
    }catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
})

router.get("/:studioId/:artistId/calendarevent", async (req, res) => {
  try{
    let studio = await Studio.findById(req.params.studioId)
    let artist = await Studio.artists.findById(req.params.artistId)

    console.log(artist)
    return res.send(artist)

  }catch(er){
    console.log(er)
  }
})


router.get("/findParlour/:zip_code", async (req,res) => {
    try{      
        let studios = []
        console.time("2 zip codes")
        let cStudio = await Studio.find({zip_code: req.params.zip_code})
        if (cStudio.length > 0) studios.push(cStudio)
        for (let i = parseInt(req.params.zip_code) -2; i <= parseInt(req.params.zip_code) + 2;i++){
          if (i != parseInt(req.params.zip_code)){
            let studio = await Studio.find({zip_code: i})
            if (studio.length > 0){
                studios.push(studio)
            }
          }
        }
        
        // console.log(studios)
        console.timeEnd("2 zip codes")
        return res.send(studios)
    }catch (err) {        
    return res.status(500).send(`Internal Server Error: ${err}`);
    }
})


router.delete("/ClearCalendars", async (req,res) => {
try{
  let list = await refreshList()
  clearAllCalendar(list.items)
  return res.send("successfully deleted all calendars")
}catch(er){
  console.log(er)
}
})

router.get("/calendarShow", async (req, res) => {
  return res.send(await refreshList())
})









}


main().catch(e => {console.log("ERROR");console.log(e)})

module.exports = router