const {MongoClient, ObjectID} = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )

function studentsController(){
    async function get(req, res){
        let data = req.query.class;
        try{
            await client.connect();
            const db = client.db(dbName);
            let studentsData = await db.collection(data).find({})
            const items = await studentsData.toArray()
            console.log(items);
            res.send(items)
        }catch(err){
            console.log(err)
        }
    }
    async function post(req, res){
        let data = req.query.class;
        req.body.grandScore = 0;
        try{
            await client.connect();
            const db = client.db(dbName);
            let studentsData = await db.collection(data).insertOne(req.body)
            console.log(studentsData);
            res.send(studentsData)
        }catch(err){
            console.log(err)
        }
    }

    async function deleteStudent(req, res){
        let queryClass = req.query.class
        try{
            await client.connect();
            const db = client.db(dbName);
            const id = ObjectID(req.query.deletedId)
            const data = await db.collection(queryClass).deleteOne( {_id: id} );
            // for temporal usage
           console.log(data)
            res.send(data)
       }catch(err){
           res.send(err)
       }   
    }

    async function updateStudent(req, res){
        let queryClass = req.query.class;
        updatedStudent = req.body
        try{
            await client.connect();
            const db = client.db(dbName);
            const id = ObjectID(req.query.updatedId)
            const data = await db.collection(queryClass).updateOne({_id: id}, { $set: {
                firstname: updatedStudent.firstname, 
                lastname: updatedStudent.lastname, 
                gender: updatedStudent.gender,
                age: updatedStudent.age,
                gender: updatedStudent.guardians_tel
            }})
            // for temporal usage
           console.log(data, 'from updated stud')
            res.send(data)
       }catch(err){
           res.send(err)
       }   
    }


//  Im gonna set a flag based on that im gonna Edit of Add the grandScore
    async function postMarks(req, res){
        let currentClass = req.query.class;
        let subject = req.query.subject
        let id = ObjectID(req.query.id)
        try{
            await client.connect();
            const db = client.db(dbName);
            const UsersId = await db.collection('register').findOne({_id: ObjectID(req.query.teachers_Id)})
            if (UsersId.position === 'teacher'){
                let score = await db.collection(currentClass).findOne({_id: id})
                console.log(score, 'from score')
                let cummulative_score = score.grandScore + req.body.totalScore
                let insertedMarks = await db.collection(currentClass).updateOne({_id: id}, {$set: {[subject]:  {classScore: req.body.classScore, examScore: req.body.examScore, totalScore: req.body.totalScore}, grandScore: cummulative_score} } ) 
                return res.send(insertedMarks);
            }
            
           
            return res.send('You are not allowed to enter mafks');
           

        }catch(err){
            console.log(err)
        }

    }

    async function postfees(req, res){
        let currentClass = req.query.class;
        let id = ObjectID(req.query.id)
        try{
            await client.connect();
            const db = client.db(dbName);
            const UsersId = await db.collection('register').findOne({_id: ObjectID(req.query.teachers_Id)})
            if (UsersId.position === 'account'){
                let insertedFees = await db.collection(currentClass).updateOne({_id: id}, {$set: {fees: req.body}} ) 
                return res.send(insertedFees);
            }
            
            return res.send('You are not allowed to enter data');

        }catch(err){
            console.log(err)
        }
    }

    return {get, post, postMarks, postfees, deleteStudent, updateStudent}
}

function marks(args){
    return {
        examsScore: args.body.examScore,
        classScore: args.body.classScore,
        totalScore: args.body.totalScore,
        subject: args.query.subject, 
        id: args.query.id
    }
}

module.exports = studentsController();