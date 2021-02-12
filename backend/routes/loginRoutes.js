let express = require('express');
let loginRouter = express.Router();
let loginController = require('../controller/loginController')


function Router(){
    loginRouter.route('/')
        .post(loginController.post)

    return loginRouter
}

module.exports = Router()