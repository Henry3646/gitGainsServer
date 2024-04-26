import mongoose from "mongoose";
import { CompletedExercise } from "./CompletedExercise.js";

const completedWorkoutSchema = mongoose.Schema({
    workoutID: { type: String },
    ownerID: { type: String },
    date: { type: Date },
    completedExercises: [String], // array of exerciseIDs
    duration: { type: Number }, // in seconds
    caloriesBurned: { type: Number }, // in calories
    totalWeightLifted: { type: Number }, // in lbs

});

export const CompletedWorkout = mongoose.model("CompletedWorkout", completedWorkoutSchema);