require('dotenv').config()

const express = require('express')
const app = express()

//The dns code only for newer nodejs versions. As mongodb wasn't connected without DNS setting for me.
const dns = require("node:dns/promises")
dns.setServers(["1.1.1.1"])

//For frontend connection
const cors = require('cors')

const authenticateUser = require('./middleware/authenticate')
const courseRouter = require('./routes/course')
const authRouter = require('./routes/auth')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Ai course maker. Add /api/v1 to url for the app. Add /auth for Authentication and /course to use the API.')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/course', authenticateUser, courseRouter)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Db connected successfully'))
    .catch((err)=>{console.log('Db not connected', err)})
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
