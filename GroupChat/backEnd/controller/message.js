const Message=require('../model/message')
const user=require('../model/user')

exports.addMessage =(req, res)=>{
   let message = req.body.message
   let groupId = req.body.grpid
   let name = req.user.name

   req.user.createMessage({msg:message,name:name,gId:groupId}).then(result=>{
    // console.log("mesg table:",result)
    res.json({result})
   }).catch(err=>{
    console.log(err)
   })


}

exports.getMessage=(req,res)=>{
    // console.log("get message frontend:",req.query.grpid)
    let groupid =req.query.grpid
    Message.findAll({where:{gId:groupid}}).then(result=>{
        // console.log(result)
        res.status(201).json({result})
    }).catch(err=>{
        console.log("eror..........",err)
    })
}