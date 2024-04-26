import express from 'express'
import { addCompletedWorkout, getCompletedWorkout, deleteCompletedWorkout } from '../controllers/CompletedWorkout.js'
const router = express.Router()

//CREATE
router.post('/add', addCompletedWorkout)
//READ
router.get('/get', getCompletedWorkout)
//DELETE
router.delete('/delete', deleteCompletedWorkout)

export default router