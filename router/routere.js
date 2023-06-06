const express = require('express')
const router = express.Router()
const message = require('../Controlleur/message.js')
router.post('/addmessage/:User1_param1/:RommeName', message.addmessage)
router.post('/showmessage', message.showmessage)
module.exports = router