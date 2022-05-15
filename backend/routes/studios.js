const {Studio, validateStudio, studioSchema} = require("../models/studio");
const {User, validateUser} = require("../models/customer.js")

const bcrypt = require("bcrypt");
const express = require('express');
const { validateArtist, Artist } = require("../models/artist");
const router = express.Router()

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
        let artist = new Artist({
            name: req.body.name
        })
        studio.artists.push(artist)
        await studio.save()
        return res.send(`Artist: ${req.body.name} succesfully added to roster of ${studio.name}`)
    }catch (err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
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

module.exports = router