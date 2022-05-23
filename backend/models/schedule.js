const mongoose = require("mongoose");
const Joi = require("joi");

const scheduleSchema = new mongoose.Schema({
    items: {type:Object},
    date: {type:String},
    customer: {type:Object}
})    
const Schedule = mongoose.model("Schedule", scheduleSchema);

function validateSchedule(artist){
const schema = Joi.object({
    items: Joi.object(),
    date: Joi.string(),
    customer: Joi.object()
})
return schema.validate(artist);
}

module.exports = {
    scheduleSchema,
    Schedule,
    validateSchedule
}