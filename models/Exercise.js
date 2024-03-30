import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true},
    reps: { type: Number, required: true},
    weight: { type: Number},
    
});

export default mongoose.model("Exercise", exerciseSchema);
module.exports = exerciseSchema;