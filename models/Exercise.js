import mongoose from "mongoose";
import { CompletedWorkout } from "./CompletedWorkout";

const exerciseSchema = mongoose.Schema({
    name: { type: String },
    sets: { type: Number },
    reps: { type: Number },
    currWeight: { type: Number },   
    ownerID: { type: String }, 
    isCustomExercise: {type: Boolean },  
    completedHistory: [CompletedWorkout],
    personalRecord: { type: Number }, // in lbs
    restTime: { type: Number }, // in seconds
    muscleGroup: { type: String },
    description:{
        type: String,
        default: "No description provided"
    }
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
