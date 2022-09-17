const express = require('express')
const router=express.Router()
const authenticateController = require('../Authorization/authenticate')
const adminController = require('../controller/admin')


router.post('/addMember',authenticateController.authenticateToken,adminController.adminCheck,adminController.adduser)
router.post('/removeMember',authenticateController.authenticateToken,adminController.adminCheck,adminController.removeUser)
router.post('/makeAdminMember',authenticateController.authenticateToken,adminController.adminCheck,adminController.makeAdminUser)
router.post('/removeAdminMember',authenticateController.authenticateToken,adminController.adminCheck,adminController.removeAdminUser)
module.exports=router