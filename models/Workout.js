import mongoose from "mongoose";

const workoutSchema = mongoose.Schema({
    name: { type: String, required: true},
    exercises: [String],
    datesCompleted: [Date],
    owner: {
        ownerName: { type: String },
        ownerID: { type: String}
    }
    
});

export const Workout = mongoose.model("Workout", workoutSchema);
