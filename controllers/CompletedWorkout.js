import { CompletedWorkout } from "../models/CompletedWorkout";
import { CompletedExercise } from "../models/CompletedExercise";

export const addCompletedWorkout = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only add your own completed workouts")
        }
        const completedWorkout = new CompletedWorkout(req.body)
        await completedWorkout.save()
        return res.status(201).json({message: "Completed Workout Added Successfully", completedWorkout: completedWorkout})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const getCompletedWorkout = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only view your own completed workouts")
        }
        const completedWorkout = await CompletedWorkout.findOne({_id: req.body.completedWorkoutId})
        return res.status(200).json({completedWorkout: completedWorkout})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}


//req params - completedWorkoutId, ownerID, userID
export const deleteCompletedWorkout = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only delete your own completed workouts")
        }
        let completedWorkout = await CompletedWorkout.deleteOne({_id: req.body.completedWorkoutId})
        return res.status(200).json({message: "Completed Workout Deleted Successfully", completedWorkout: completedWorkout})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}