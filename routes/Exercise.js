import express from 'express'
import { addExercise, addWeight, getExercise, updateExercise } from '../controllers/Exercise.js'
const router = express.Router()

//CREATE
router.post('/add', addExercise)
//READ
router.get('/getExercise', getExercise)
//UPDATE
router.post('/updateExercise', updateExercise)
router.post('/addWeight', addWeight)
//DELETE


export default router 