const express = require('express')
const dotenv = require('dotenv').config()
const mongoose  = require('mongoose')
const authController = require('./controllers/auth')
const commentController = require('./controllers/comment')
const postController = require('./controllers/post')
const userController = require('./controllers/user')
const app = express()

//connect database
mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connected'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/user', userController)
app.use('/post', postController)
app.use('/comment', commentController)

//connect server
app.listen(process.env.PORT, () => console.log('Server Connected'))