import  { User, validateUser } from '../models/Users.js'
import { Workout } from '../models/Workout.js'

//Gets workouts owned by logged in user
export const getWorkouts = async (req, res) => {
    //checks if user is valid
    let user = await User.findOne({ _id: req.body.userID })
    if (!user) {
        return res.status(400).send('User not authenticated.')
    } else {
        //returns users workouts
        let workouts = user.workouts
        return res.status(200).json({workouts: workouts})
    }
}

export const addWorkout = async (req, res) => {
    const user = await User.findOne({_id: req.body.userID})
    const workout = new Workout({
        name: req.body.name,
        exercises: [],
        owner: {
            ownerName: user.name,
            ownerID: user._id
        }
    })
    await workout.save()
    return res.status(200).json(workout)
}

//gets all workouts assosciated with an owner
//need to secure this up a bit
export const getWorkoutsByOwnerId = async (req, res) => {
    try {
        const workouts = await Workout.find({ 'owner.ownerID': req.body.userID})
        return res.status(200).json(workouts)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//deletes a workout
//TODO - add security to check if user owns workout
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.deleteOne({_id: req.body.workoutID})
        return res.status(200).json({message: "Workout deleted successfully", workout: workout});
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}


//updates a workout
export const updateWorkout = async (req, res) => {
    try {
        let workout = await Workout.findOne({_id: req.body.workoutID})
        if (workout.owner.ownerID !== req.body.userID) {
            return res.statis(400).json({message: "You can only update your own workouts"})
        } else {
            try {
                await Workout.findByIdAndUpdate({_id: req.body.workoutID}, {$set: req.body})
                return res.status(200).json({message: "Workout Updated"})
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

//Adds an exercise to the exercise array in the workout, 
//only adds the id of an existing exercise
//TODO - check if exercise exists, add security
export const addExercise = async (req, res) => {
    try {
        const workout = await Workout.findOne({_id: req.body.workoutID})
        workout.exercises.push(req.body.exerciseID)
        workout.save()
        return res.status(200).json({message: "Exercise added", workout: workout})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
//removes an exercise from the exercises array of a workout
//TODO - add security
export const removeExercise = async (req, res) => {
    try {
        const workout = await Workout.findOne({_id: req.body.workoutID})
        const index = workout.exercises.indexOf(req.body.exerciseID)
        if (index > -1){
            workout.exercises.splice(index,1)
        }
        workout.save()
        return res.status(200).json({message: "Exercise removed", workout: workout})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
