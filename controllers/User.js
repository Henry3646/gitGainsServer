import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  { User, validateUser } from '../models/Users.js'
const SECRET = process.env.SECRET


//Signs up a new user
export const signup = async (req, res) => {
    //Validate user data
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    //Check if user exists with email
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exists. Please sign in')
    } else {
        try {
            const map = new Map()
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                dateCreated: Date(),
            })
            await user.save()
            return res.status(201).json(user)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

//Signs in a user
export const signin = async (req, res) => {
    // I dont know if I need this block of code or not...
    // const { error } = validateUser(req.body)
    // const SECRET = process.env.SECRET
    // if (error) {
    //     console.log("in error of signin")
    //     return res.status(401).send(error.details[0].message)
    // } else {

        try {
            let user = await User.findOne({ email: req.body.email})
            // if no user with email exists, error
            if (!user) {
                return res.status(400).json({ message: 'Incorrect email or password'})
            }
            //compares given password with encrypted password
            const correctPassword = await bcrypt.compare(req.body.password, user.password)
            if (!correctPassword) {
                return res.status(400).json({ message: 'Incorrect email or password'})
            }
            //creates new token with user id
            const token = jwt.sign({ id: user._id }, SECRET)
            //adds token to cookies
            //might change this code later depending on how I need it in swift frontend
            res.cookie(
                "token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: "strict",
                    maxAge: 30000
                }
            )
            res.json({ message: 'Successfully logged in', user: user, token: token })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
//}


//Updates user info
export const updateUser = async (req, res) => {
    //check if logged in userid matches query id to update
    if (req.body.userID === req.query.id) {

        //if password is being changed, encrypt and change in the body
        if(req.body.password) {
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
        }
        //updates the user and returns updated user object
        try{
            await User.findByIdAndUpdate({_id: req.body.userID}, {$set: req.body})
            const user = await User.findOne({_id: req.body.userID})
            res.status(200).json({message: "Account Updated", user: user})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    } else {
        return res.status(403).json({ message: "You can only update your own account"})
    }
}

//Adds a workout to a users account
//NOT BEING USED
export const addWorkoutToUser = async (req, res) => {
    //check if logged in userid matches query id to add
    if (req.body.userID === req.query.id) {
        try{
            const workout = req.body.workout
            const user = await User.findOne({_id: req.body.userID})
            if (user.workouts.has(workout._id)){
                return res.status(400).json({message: "Workout already exists"})
            } else {
                const newWorkouts = user.workouts
                newWorkouts.set(workout._id, workout.name)
                user.workouts = newWorkouts
                await User.findByIdAndUpdate({_id: req.body.userID}, {workouts: newWorkouts})
                return res.status(200).json({message: "New workout added to account", user: user})
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    } else {
        return res.status(403).json({message: "You can only add workouts to your own account"})
    }
}


//Removes a workout from a users account
//NOT BEING USED
export const removeWorkoutFromUser = async (req, res) => {
    if (req.body.userID === req.query.id) {
        try{
            const user = await User.findOne({_id: req.body.userID})
            const newWorkouts = user.workouts
            if (!user.workouts.has(req.body.workoutID)){
                return res.status(400).json({message: "Workout does not exist"})
            } else {
                try {
                    newWorkouts.delete(req.body.workoutID)
                    await User.findByIdAndUpdate({_id: req.body.userID}, {workouts: newWorkouts})
                    return res.status(200).json({message: "Workout removed from user"})
                } catch (err) {
                    return res.status(500).json({message: err.message})
                }
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    } else {
        return res.status(403).json({message: "You can only remove workouts from your own account"})
    }
}


//deletes a user from the database
//TODO - add security
//FIXED - forgot to add await, silly me
export const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.body.userID})
        return res.status(200).json({message: "User deleted successfully", user: user});
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
