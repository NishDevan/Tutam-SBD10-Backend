import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import booksRouter from './routes/books.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/books', booksRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`Server running on ${port}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })