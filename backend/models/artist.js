const mongoose = require("mongoose");
const Joi = require("joi");

const artistSchema = new mongoose.Schema({
    name:{type:String},
    calendar:{type:Object},
})    
const Artist = mongoose.model("Artist", artistSchema);

function validateArtist(artist){
const schema = Joi.object({
    name:Joi.string().required(),
    calendar:Joi.object()
})
return schema.validate(artist);
}

module.exports = {
    artistSchema,
    Artist,
    validateArtist
}