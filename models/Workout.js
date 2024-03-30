import mongoose from "mongoose";
import exerciseShema from 'Exercise.js';

const workoutSchema = mongoose.Schema({
    name: { type: String, required: true},
    exercises: [String],
    datesCompleted: [Date],
    
});

export default mongoose.model("Workout", workoutSchema);
