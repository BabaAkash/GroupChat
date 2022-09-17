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
 exports.postlogin =async (req,res)=>{
    let email = req.body.email
    let password = req.body.password// user k through password
    let userData =await user.findAll({where:{email:email}})

     
       if(userData.length>0){// user found
          const userId = userData[0].id
          const userName = userData[0].name
          const userEmail = userData[0].email
          const userPassHash = userData[0].password 

          const match = await bycrpt.compare(password,userPassHash)
          if(match){
            let token = JWT.sign(userId,process.env.TOKEN_SECRET)
             
             res.status(202).json({msg:"Login successfull" , token:token, name: userName ,email:userEmail })
          }else{
            res.status(401).json({msg:"Login not authorised"})
          }
       }else{
          res.status(404).json({msg:"user not found"})
       }
 }