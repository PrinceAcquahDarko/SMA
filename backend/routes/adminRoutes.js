let express = require('express');
let adminRouter = express.Router();
let adminController = require('../controller/adminController')

function router(){
    adminRouter.route('/')
        .post(adminController.post)
        .get(adminController.get)

    return adminRouter
}

module.exports = router();