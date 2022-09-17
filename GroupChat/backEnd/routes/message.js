const express = require('express')
const router=express.Router()
const messageController=require('../controller/message')
const authenticateController = require('../Authorization/authenticate')



router.post('/addMsg',authenticateController.authenticateToken, messageController.addMessage)
router.get('/getMessage',authenticateController.authenticateToken, messageController.getMessage)


module.exports=router