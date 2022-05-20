const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name:{type:String},
    calendar:{type:Object},
    schedule:{type:Object},
})    
const User = mongoose.model("User", userSchema);

function validateUser(artist){
const schema = Joi.object({
    name:Joi.string().required(),
    calendar:Joi.object(),
    schedule:Joi.object(),
})
return schema.validate(artist);
}

module.exports = {
    userSchema,
    User,
    validateUser
}