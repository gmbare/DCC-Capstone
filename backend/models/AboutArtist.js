const mongoose = require("mongoose");
const Joi = require("joi");
const { reviewSchema } = require("./review.js");

const AboutArtistSchema = new mongoose.Schema({
    description:{type:String},
    reviews:[{type:reviewSchema}],
    rating:{type:Number}
})
const AboutArtist = mongoose.model("AboutArtist", AboutArtistSchema);

function validateAboutArtist(artist){
const schema = Joi.object({
})
return schema.validate(artist);
}

module.exports = {
    AboutArtistSchema,
    AboutArtist,
    validateAboutArtist
}