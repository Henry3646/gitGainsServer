import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: { type: String},
    sets: { type: Number},
    reps: { type: Number},
    currWeight: { type: Number},
    owner: { type: String},
    isCustomExercise: {type: Boolean},
    repHistory: [Number],
    weightHistory: [Number],
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
