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
    async function postMarks(req, res){
        let currentClass = req.query.class;
        let subject = req.query.subject
        let id = ObjectID(req.query.id)
        try{
            await client.connect();
            const db = client.db(dbName);
            const UsersId = await db.collection('register').findOne({_id: ObjectID(req.query.teachers_Id)})
            if (UsersId.position === 'teacher'){
                let insertedMarks = await db.collection(currentClass).updateOne({_id: id}, {$set: {[subject]:  {classScore: req.body.classScore, examScore: req.body.examScore, totalScore: req.body.totalScore}}} ) 
                res.send(insertedMarks);
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

    return {get, post, postMarks, postfees}
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