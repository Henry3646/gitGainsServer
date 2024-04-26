import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
    //id: { type: String },
    name: { type: String, min: 4, max: 100 },
    email: { type: String, min: 5, max: 255 },
    password: { type: String, min: 8, max: 100 },
    dateCreated: { type: Date },
    workouts: [String],
    isPremium: { type: Boolean },
})

export function validateUser(user) {
    console.log("in validateUser")
    const schema = Joi.object({
        name: Joi.string().min(4).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })

    return schema.validate(user)
}

export const User = mongoose.model("User", userSchema)

