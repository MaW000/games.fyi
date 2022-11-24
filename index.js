const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const path = require('path');
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const socket = require('socket.io')
const createUserRoutes = require('./routes/createUserRoutes')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const createServerRoute = require('./routes/createServerRoute')
const {userJoin} = require('./utils/users');
app.use((cors()))
app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', createUserRoutes)
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api', userRoutes)
app.use('/api', createServerRoute)
app.use('/api', messagesRoute)

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Started on Port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB Connection Succesfull');
    })
    .catch((err) => {
        console.log(err.message)
    })