const mongoose = require("mongoose");
const Joi = require("joi");
const artist = require('./artist')

const studioSchema = new mongoose.Schema({
    zip_code : {type:String},
    artists:[{type:artist}],
    name:{type:String},
})

const Studio = mongoose.model("Studio", studioSchema);

function validateStudio(studio){
    const schema = Joi.object({
        zip_code: Joi.string().required(),
        name:Joi.string().required(),
        artists:Joi.array()
    })
    return schema.validate(studio);
}

module.exports = {
    studioSchema,
    Studio,
    validateStudio
}