let express = require('express');
let studentsRouter = express.Router();
let studentsController = require('../controller/studentsController')


function router(){
    studentsRouter.route('/')
        .get(studentsController.get)
        .post(studentsController.post)
    return studentsRouter
}

module.exports = router();