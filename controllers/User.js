import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  { User, validateUser } from '../models/Users.js'
const SECRET = process.env.SECRET

export const signup = async (req, res) => {
    const { error } = validateUser(req.body)
    console.log(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    console.log(req.body)

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exists. Please sign in.')
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: password
            })
            await user.save()
            return res.status(201).json(user)
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export const signin = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(401).send(error.details[0].message)
    } else {
        try {
            let user = await User.findOne({ email: req.body.email})
            if (!user) {
                return res.status(400).json({ message: 'Incorrect email or password.'})
            }
            const correctPassword = await bcrypt.compare(req.body.password, user.password)
            if (!correctPassword) {
                return res.status(400).json({ message: 'Incorrect email or password.'})
            }
            const token = jwt.sign({ id: user._id }, SECRET)
            res.cookie(
                "token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: "strict",
                    maxAge: 30000
                }
            )
            res.json({ message: 'Successfully logged in' })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
}
