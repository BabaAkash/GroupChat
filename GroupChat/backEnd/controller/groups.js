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
  /// req.user(login user)  isi user ne group bnaya hai
  // ur joh humne relation bnaya hai uska data nikalnge
  // iski help say hum uergroup table ki help say user ko bta sakte hai boh group mein present h ya nhi
    req.user.getGroups().then(result=>{
        //  console.log("get Groups:",result)
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
}

// user ne jitne b group bna rah h uski  group id  banti hai ur uske sath chat page par Grpid ja rahi hai

exports.Getadmin =(req, res)=>{
    const groupID = req.query.grpId
    //step-2 why i m using userGroup table
    // muje pta lgana hai ki admin(jis user say hum login "userID" hai ur jisay group create "groupID" )
    //toh humhe kese pta chalega 
    // kis user ne konsa group craete kiya hai 
    // userGroup k through hum groupID or userID dono pata chal jayega 
     userGroup.findOne({where:{userId:req.user.id , groupId:groupID}}).then(user=>{
        // console.log("isAdmin user",user)
        res.status(201).json({user})
     }).catch(err=>{
        console.log(err)
     })
}