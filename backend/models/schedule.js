const mongoose = require("mongoose");
const Joi = require("joi");

const scheduleSchema = new mongoose.Schema({
    items: {type:Object}
})    
const Schedule = mongoose.model("Schedule", scheduleSchema);

function validateSchedule(artist){
const schema = Joi.object({
    items: Joi.object()
})
return schema.validate(artist);
}

module.exports = {
    scheduleSchema,
    Schedule,
    validateSchedule
}