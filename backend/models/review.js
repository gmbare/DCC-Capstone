const mongoose = require("mongoose");
const Joi = require("joi");

const reviewSchema = new mongoose.Schema({
    text: {type:String},
    rating: {type:Number},
    image: {type:String},
    rater: {type:
        {name:{type:String},
        email:{type:String}
        }
    }
})    
const Review = mongoose.model("Review", reviewSchema);

function validateReview(artist){
const schema = Joi.object({
    text: Joi.string(),
    rating: Joi.number(),
    rater: Joi.object()
})
return schema.validate(artist);
}

module.exports = {
    reviewSchema,
    Review,
    validateReview
}