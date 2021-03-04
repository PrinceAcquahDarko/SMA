let express = require('express');
let adminRouter = express.Router();
let adminController = require('../controller/adminController')
let position = require('../controller/middleware')

function router(){
    adminRouter.route('/')
        .post(position.authorize, adminController.post)
        .get(adminController.get)

    return adminRouter
}

module.exports = router();