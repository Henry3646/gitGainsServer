import mongoose from "mongoose";

const completedExerciseSchema = mongoose.Schema({
    exerciseID: { type: String, required: true },
    dateCompleted: { type: Date, required: true },
    sets: { type: Number, required: true },
    reps: [{ type: Number, required: true }],
    weight: [{ type: Number, required: true }],
    ownerID: { type: String, required: true },
})

export const CompletedExercise = mongoose.model("CompletedExercise", completedExerciseSchema);
