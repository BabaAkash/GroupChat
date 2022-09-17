const express = require('express')
const router=express.Router()
const groupController=require('../controller/groups')
const authenticateController = require('../Authorization/authenticate')



router.post('/creategroup',authenticateController.authenticateToken, groupController.createGroup)
router.get('/getGroups',authenticateController.authenticateToken, groupController.getGroup)
router.get('/isAdmin',authenticateController.authenticateToken, groupController.Getadmin)

module.exports=router