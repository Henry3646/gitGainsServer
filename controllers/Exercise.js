import { Exercise } from '../models/Exercise.js'
import { User } from '../models/Users.js'

//Adds an exercise to the database
//Might need to add some security to this...
export const addExercise = async (req, res) => {
    const exercise = new Exercise({
        name: req.body.name,
        sets: 0,
        reps: 0,
        currWeight: 0,
        owner: req.body.userID,
        isCustomExercise: req.body.isCustomExercise,
        repHistory: [],
        weightHistory: [],
    })
    try{
        await exercise.save()
        return res.status(200).json({message: "Exercise added successfully", exercise: exercise})
    } catch (err) {
        return res.status(500).json({message: err.message})
    } 
}


//Gets an exercise by it's ID
//Might need to add some more security
export const getExercise = async (req, res) => {
    try {
        const exercise = await Exercise.findOne({_id: req.body.exerciseId})
        return res.status(200).json({exercise: exercise})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//Updates the non array values of the exercise
export const updateExercise = async (req, res) => {
    try {
        let exercise = await Exercise.findOne({_id: req.body.exerciseId})
        if (exercise.owner != req.body.userID) {
            return res.status(400).json("You can only update your own exercises")
        } else {
            try {
                await Exercise.findByIdAndUpdate({_id: req.body.exerciseId}, {$set: req.body})
                return res.status(200).json({message: "Exercise Updated Successfully", exercise: exercise})
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
        }
    } catch (err) {
        return res.status(200).json({message: err.message})
    }
}

//Pushes a weight to the weightHistory array in an exercise 
export const addWeight = async (req, res) => {
    try {
        let exercise = await Exercise.findOne({_id: req.body.exerciseId})
        if (exercise.owner != req.body.userID) {
            return res.status(400).json("You can only update your own exercises")
        } else {
            try{ 
                await Exercise.findByIdAndUpdate({_id: req.body.exerciseId}, {$push: {weightHistory: req.body.weight}})
                return res.status(200).json({message: "Weight added successfully", exercise: exercise})
            } catch (err) {
                return res.status(200).json({message: err.message})
            } 
        }
    } catch (err) {
        return res.status(200).json({message: err.message})
    } 
}

//Pushes a rep to the repHistory array in an exercise
export const addRep = async (req, res) => {
    try {
        let exercise = await Exercise.findOne({_id: req.body.exerciseId})
        if (exercise.owner != req.body.userID) {
            return res.status(400).json("You can only update your own exercises")
        } else {
            try{ 
                await Exercise.findByIdAndUpdate({_id: req.body.exerciseId}, {$push: {repHistory: req.body.rep}})
                return res.status(200).json({message: "Reps added successfully", exercise: exercise})
            } catch (err) {
                return res.status(200).json({message: err.message})
            } 
        }
    } catch (err) {
        return res.status(200).json({message: err.message})
    } 
}