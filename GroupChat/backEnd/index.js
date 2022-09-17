require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const sequelize = require('./util/database')
const userRoute = require('./routes/user')
const groupsRoute = require('./routes/groups')


//models
const User = require('./model/user')
const groups = require('./model/group')
const usergroup= require('./model/userGroup')

const app = express()
app.use(cors())

//middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

//routes
app.use(userRoute)
app.use(groupsRoute)
app.use(groupsMessage)


//relation
User.belongsToMany(groups, { through: usergroup });
groups.belongsToMany(User, { through: usergroup });



sequelize.sync().then(res=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
})
