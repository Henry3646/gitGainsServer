import * as dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/Users.js'
dotenv.config()

const app = express();
const db = mongoose.connection
//TODO - FIX THIS, cant read body properly :(
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/user', userRoutes)


const port = process.env.PORT || 8080
mongoose.connect(process.env.MONGO_URI)
mongoose.set('strictQuery', true)
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to Database"))
app.listen(port, () => console.log(`app listening on http://localhost:${port}`))