const mongoose = require("mongoose");
const Joi = require("joi");
const {scheduleSchema} = require('./schedule.js')
const {AboutArtistSchema} = require('./AboutArtist.js')

const artistSchema = new mongoose.Schema({
    name:{type:String},
    calendar:{type:Object},
    schedule:{type:Object},
    events:[{type:scheduleSchema}],
    about:{type:AboutArtistSchema},
})    
const Artist = mongoose.model("Artist", artistSchema);

function validateArtist(artist){
const schema = Joi.object({
    name:Joi.string().required(),
    calendar:Joi.object(),
    schedule:Joi.object(),
    events:Joi.array(),
    about:Joi.object()
})
return schema.validate(artist);
}

module.exports = {
    artistSchema,
    Artist,
    validateArtist
}