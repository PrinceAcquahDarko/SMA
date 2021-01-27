let express = require('express');
let registerRouter = express.Router();
const registerController = require('../controller/registerController')


function Router(){
    registerRouter.use(registerController.validate)
    registerRouter.route('/')
        .post(registerController.post)
    return registerRouter
}

module.exports = Router