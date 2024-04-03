import express from "express";
import { addWorkoutToUser, deleteUser, removeWorkoutFromUser, signin, signup, updateUser } from '../controllers/User.js'
const router = express.Router()

//CREATE
router.post('/signup', signup)
//READ
router.post('/signin', signin)
//UPDATE
router.get('/updateUser', updateUser)
router.post('/addWorkoutToUser', addWorkoutToUser)
router.get('/removeWorkoutFromUser', removeWorkoutFromUser)
//DELETE
router.delete('/deleteUser', deleteUser)

export default router