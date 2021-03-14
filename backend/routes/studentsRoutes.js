let express = require('express');
let studentsRouter = express.Router();
let studentsController = require('../controller/studentsController')
let position = require('../controller/middleware')

function router(){
    studentsRouter.route('/')
        .get(studentsController.get)
        .post(studentsController.post)
        .delete(studentsController.deleteStudent)
       
    studentsRouter.route('/update')
        .patch(studentsController.updateStudent);
    studentsRouter.route('/marks')
        .post(position.authorize, studentsController.postMarks)

    studentsRouter.route('/fees')
        .post(position.authorize, studentsController.postfees)

    

    return studentsRouter
}

module.exports = router();