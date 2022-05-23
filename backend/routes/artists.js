const {Studio, validateStudio, studioSchema} = require("../models/studio");
// const {User, validateUser} = require("../models/customer.js")
// const {main, refreshList} = require("../db/googleAPI")
// const calendar = getAuth()
const bcrypt = require("bcrypt");
const express = require('express');
const { validateArtist, Artist } = require("../models/artist");
const { google } = require("googleapis");
const { Schedule } = require("../models/schedule");
const { Review, validateReview } = require("../models/review");
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
        let {err} = validateReview(req.body)
        if (err) return res.send("Please check your inputs and try again")
        let studio = await Studio.findById(req.params.studioId)
        let artist = studio.artists.id(req.params.artistId)
        // let artist = studio.artists.id(req.params.artistId)
        let review = new Review({text:req.body.text, rating:req.body.rating,raterName:req.body.raterName, raterEmail:req.body.raterEmail})
        artist.about.reviews.push(review)
        console.log(studio)
        await studio.save()
        return res.send(artist)
    }catch(er){

    }
})




module.exports = router