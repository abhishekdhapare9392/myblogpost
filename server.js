const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// Connect DB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcome to my profile website API...' })
// )

// Define Routes
app.use('/api/posts', require('./routes/posts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))