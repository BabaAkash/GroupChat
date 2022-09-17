require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const sequelize = require('./util/database')
const userRoute = require('./routes/user')

//models
const User = require('./model/user')

const app = express()
app.use(cors())

//middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

//routes
app.use(userRoute)


sequelize.sync().then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
