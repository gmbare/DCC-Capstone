const mongoose = require("mongoose");
const Joi = require("joi");

const artistSchema = new mongoose.Schema({
    name:{type:String},
    //schedule:{type:Calendly},
})    
const Artist = mongoose.model("Artist", artistSchema);

function validateArtist(artist){
const schema = Joi.object({
    name:Joi.string().required(),
})
return schema.validate(artist);
}

module.exports = {
    artistSchema,
    Artist,
    validateArtist
}