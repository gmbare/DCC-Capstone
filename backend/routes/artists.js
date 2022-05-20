const {Studio, validateStudio, studioSchema} = require("../models/studio");
// const {User, validateUser} = require("../models/customer.js")
// const {main, refreshList} = require("../db/googleAPI")
// const calendar = getAuth()
const bcrypt = require("bcrypt");
const express = require('express');
const { validateArtist, Artist } = require("../models/artist");
const { google } = require("googleapis");
const { Schedule } = require("../models/schedule");
const { Review } = require("../models/review");
const router = express.Router()



router.get("/:studioId/findartist/:artistId", async (req,res) => {
    try{
        let studio = await Studio.findById(req.params.studioId)
        let artist = studio.artists.id(req.params.artistId)
        return res.send(artist)
    }catch (err) {        
    return res.status(500).send(`Internal Server Error: ${err}`);
    }
})


router.put("/:studioId/reviewartist/:artistId", async(req, res) => {
    try{
        let studio = await Studio.findById(req.params.studioId)
        let artist = stuido.artists.id(req.params.artistId)
        let review = new Review({text:req.body.text, rating:req.body.rating,rater:{name:req.body.raterName, email:req.body.raterEmail}})
    }catch(er){

    }
})




module.exports = router