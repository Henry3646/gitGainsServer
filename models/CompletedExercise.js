import mongoose from "mongoose";

const completedExerciseSchema = mongoose.Schema({
    exerciseID: { type: String, },
    dateCompleted: { type: Date, },
    sets: { type: Number, },
    reps: [{ type: Number, }],
    weight: [{ type: Number, }],
    ownerID: { type: String, },
    totalWeight: { type: Number, },
    totalReps: { type: Number, },
    totalSets: { type: Number, },

})

export const CompletedExercise = mongoose.model("CompletedExercise", completedExerciseSchema);
