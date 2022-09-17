const User=require('../model/user')
const Group=require('../model/group')
const userGroup = require('../model/userGroup')

exports.adminCheck =(req, res, next)=>{
  let grpID = req.body.grpId
  console.log("admin check group id",req.body.grpId)
  userGroup.findOne({where:{groupId:grpID , userId:req.user.id}}).then(result=>{
    if(!result.isAdmin){
      res.json({msg:"you are not admin"})
    }else{
      next()
    }
  }).catch(err=>{
    console.log(err)
  })
}

exports.adduser=(req,res,next)=>{
  let email = req.body.email
  let groupId = req.body.grpId
  console.log("front group id",req.body)
 // email k thorugh user ko nikalna// kisko add karna
  User.findOne({where:{email:email}}).then(adduser=>{
    // console.log("emial user:",user)
    if(adduser==null){
      res.status(404).json({msg:"user not exist"})
    }else{
      //
      let userID = adduser.id
      userGroup.create({userId:userID, groupId:groupId}).then(newMember=>{
        console.log("new memeber add",newMember)
        res.json("member add successfull")
      }).catch(err=>{
        console.log(err)
      })
    }
  })
}

exports.removeUser=(req, res)=>{
  let email = req.body.removeEmail
  let groupId = req.body.grpId
  // console.log("remove detail,",email, groupID)
  User.findOne({where:{email:email}}).then(user=>{
    if(user){
      let userID = user.id
      userGroup.destroy({where:{userId:userID, groupId:groupId}}).then(result=>{
        console.log("remove successfull")
        res.status(201).json({msg:"successFull remove user"})
      }).catch(err=>{
        console.log("user Remove errro find",err)
      })
    }else{
      console.log("user not found")
    }
  })
}

exports.makeAdminUser=(req, res)=>{
  let email = req.body.makeAdminEmail
  let groupId = req.body.grpId

  User.findOne({where:{email:email}}).then(user=>{
   
    if(user){
       let  userId =user.id 
       userGroup.update({isAdmin:true},{where:{userId:userId, groupId:groupId}}).then(result=>{
        // console.log("make a Admin", result)
        res.status(201).json({msg:"now you are admin"})
       }).catch(err=>{
        console.log(err)
       })
    }else{
     console.log("user not found, please add user in group")
    }
  })
  
}

/////Remove admin Member

exports.removeAdminUser=(req, res)=>{
  let email = req.body.removeAdminEmail
  let groupId = req.body.grpId
  
  User.findOne({where:{email:email}}).then(user=>{
   
    if(user){
       let  userId =user.id 
       userGroup.update({isAdmin:false},{where:{userId:userId, groupId:groupId}}).then(result=>{
      
        res.status(201).json({msg:"now you are not admin"})
       }).catch(err=>{
        console.log(err)
       })
    }else{
     console.log("user not found")
    }
  })

}