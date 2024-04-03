import express from "express";
import { addWorkout, getWorkouts, getWorkoutsByOwnerId, deleteWorkout, updateWorkout, addExercise, removeExercise } from "../controllers/Workout.js";
const router = express.Router()

//CREATE
router.post('/addWorkout', addWorkout)
//READ
router.get('/getWorkouts', getWorkouts)
router.get('/getWorkoutsByOwnerId', getWorkoutsByOwnerId)
//UPDATE
router.post('/updateWorkout', updateWorkout)
router.post('/addExercise', addExercise)
router.post('/removeExercise', removeExercise)
//DELETE
router.get('/deleteWorkout', deleteWorkout)

export default router