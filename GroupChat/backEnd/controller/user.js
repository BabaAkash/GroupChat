const user = require('../model/user')
const JWT = require('jsonwebtoken')
const bycrpt = require('bcrypt')

exports.postSign =async (req, res)=>{
    
   let userDetail = req.body
   let existingUser = await user.findAll({where:{email:userDetail.email}})
   if(existingUser.length == 0){
    const hashPassword = await bycrpt.hashSync(userDetail.password,10)
    let Newuser =await user.create({
       name:userDetail.name,
       email:userDetail.email,
       phoneNumber:userDetail.mobile,
       password:hashPassword
      })
      console.log("database save",Newuser)
       res.json({flag:true})
   }else{
       res.json({flag: false})
   } 
 }
