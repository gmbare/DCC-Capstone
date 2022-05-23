const mongoose = require("mongoose");
const Joi = require("joi");

const reviewSchema = new mongoose.Schema({
    text: {type:String},
    rating: {type:Number},
    image: {type:String},
    raterName: {type:String},
    raterEmail:{type:String}
})    
const Review = mongoose.model("Review", reviewSchema);

function validateReview(artist){
const schema = Joi.object({
    text: Joi.string(),
    rating: Joi.number(),
    raterName: Joi.string(),
    raterEmail:Joi.string(),
})
return schema.validate(artist);
}

module.exports = {
    reviewSchema,
    Review,
    validateReview
}