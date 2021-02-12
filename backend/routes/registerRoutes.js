let express = require('express');
let registerRouter = express.Router();
const registerController = require('../controller/registerController')


function Router(){
    registerRouter.use(registerController.validate)
    registerRouter.route('/')
        .post(registerController.post)
        .get(registerController.get)
        .put(registerController.update)
    return registerRouter
}

module.exports = Router()