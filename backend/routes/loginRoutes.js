let express = require('express');
let loginRouter = express.Router();
let loginController = require('../controller/loginController')

const posts = [
    {name: 'Prince', age: '23'},
    {name: 'Darko', age: '27'}
]

function Router(){
    loginRouter.route('/')
        .post(loginController.post)

    return loginRouter
}

module.exports = Router