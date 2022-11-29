require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router =  require('./routes/router')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open', ()=> console.log('Connected to DB'))

app.use(express.json())
app.use(cors())
app.use('/trello', router)
const port = process.env.PORT
app.listen(port,  () => console.log('app listening on port ' + port + '!'))