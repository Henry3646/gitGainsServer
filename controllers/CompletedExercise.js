import { CompletedExercise } from '../models';

export const addCompletedExercise = async (req, res) => {
    try {
        const completedExercise = new CompletedExercise(req.body)
        await completedExercise.save()
        return res.status(201).json({message: "Completed Exercise Added Successfully", completedExercise: completedExercise})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//req params - completedExerciseId
export const getCompletedExercise = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only view your own completed exercises")
        }
        const completedExercise = await CompletedExercise.findOne({_id: req.body.completedExerciseId})
        return res.status(200).json({completedExercise: completedExercise})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//req params - completedExerciseId
export const deleteCompletedExercise = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only delete your own completed exercises")
        }
        let completedExercise = await CompletedExercise.deleteOne({_id: req.body.completedExerciseId})
        return res.status(200).json({message: "Completed Exercise Deleted Successfully", completedExercise: completedExercise})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const updateCompletedExercise = async (req, res) => {
    try {
        if (req.body.userID != req.body.ownerID) {
            return res.status(400).json("You can only update your own completed exercises")
        }
        let completedExercise = await CompletedExercise.updateOne({_id: req.body.completedExerciseId}, req.body)
        return res.status(200).json({message: "Completed Exercise Updated Successfully", completedExercise: completedExercise})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}