const User = require('../model/user')
const jwt =  require('jsonwebtoken')

exports.authenticateToken = (req, res, next)=>{
    let token = req.header('authorization')
    
        const userID = jwt.verify(token, process.env.TOKEN_SECRET)
        
        User.findByPk(userID).then(user=>{
            req.user = user
            next() // move to route
        }).catch(err=>{
            throw new err
        })
}