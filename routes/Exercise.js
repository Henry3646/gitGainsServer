import express from 'express'
import { addExercise, addRep, addWeight, getExercise, updateExercise } from '../controllers/Exercise.js'
const router = express.Router()

//CREATE
router.post('/add', addExercise)
//READ
router.get('/getExercise', getExercise)
//UPDATE
router.post('/updateExercise', updateExercise)
// REMOVED - Updated CompletedExercise to replace storing completed exercises in Exercise
//router.post('/addWeight', addWeight)
//router.post('/addRep', addRep) 
//DELETE
router.delete('/delete', deleteExercise)


export default router 