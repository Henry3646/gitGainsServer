import express from 'express'
import { addCompletedExercise, getCompletedExercise, updateCompletedExercise } from '../controllers/CompletedExercise.js'
const router = express.Router()

//CREATE
router.post('/add', addCompletedExercise)
//READ
router.get('/get', getCompletedExercise)
//UPDATE
router.post('/update', updateCompletedExercise)
//DELETE
router.delete('/delete', deleteCompletedExercise)

export default router