let express = require('express');
let registerRouter = express.Router();
const registerController = require('../controller/registerController')

const posts = [
    {name: 'Prince', age: '23'},
    {name: 'Darko', age: '27'}
]

function Router(){
    registerRouter.route('/')
        .post(registerController.post)
    return registerRouter
}

module.exports = Router