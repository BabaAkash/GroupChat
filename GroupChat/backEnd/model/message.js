const sequelize=require('../util/database')
const Sequelize=require('sequelize')

const Message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    msg:{
        type:Sequelize.STRING,

    },
    name:{
        type:Sequelize.STRING,
    },
    gId:{
        type:Sequelize.INTEGER,
    }
})
module.exports=Message