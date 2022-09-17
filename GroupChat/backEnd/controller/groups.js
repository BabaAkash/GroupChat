const User=require('../model/user')
const Group=require('../model/group')
const userGroup = require('../model/userGroup')


exports.createGroup=(req,res)=>{
   
    var groupname=req.body.groupName
//     console.log("user get",req.user)
//    console.log("name :", groupname)
    req.user.createGroup({groupname:groupname}).then(ress=>{
        userGroup.update({isAdmin:true},{where:{userId:req.user.id}}).then(data=>{
            console.log("userGroup data:",data)
            res.status(202).json("group Add")
        })
    })
    .catch(err=>{
        console.error(err,"not created group")
    })
}

exports.getGroup=(req, res)=>{
  /// req.user(login user)  this user create the groups
  // and whatever we create the relation of junction table so we will get the data
    req.user.getGroups().then(result=>{
        //  console.log("get Groups:",result)
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
}

// user create group so we got group id and also chat page link provided
exports.Getadmin =(req, res)=>{
    const groupID = req.query.grpId
    
     userGroup.findOne({where:{userId:req.user.id , groupId:groupID}}).then(user=>{
        // console.log("isAdmin user",user)
        res.status(201).json({user})
     }).catch(err=>{
        console.log(err)
     })
}