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
            // const items = await studentsData.toArray()
            console.log(studentsData);
            res.send(studentsData)
        }catch(err){
            console.log(err)
        }
    }
    async function postMarks(req, res){
        let currentClass = req.query.class;
        let subject = req.query.subject
        // req.body.subject = 'maths';
        let id = ObjectID(req.query.id)
        // let a ={
        //     currentClass,
        //     subject, 
        //     id
        // }
        // console.log(a);
        // res.send(a);
        try{
            await client.connect();
            const db = client.db(dbName);
            // let marks = {}
            // marks[subject] = req.body
            // let data = {
            // }
            // data[subject] = req.body
            // let data2 = {}
            // data2[subject] = data
            // let datas = []

            // let classScore =  subject
            // let classScore = datas
            // let examsScore = 'data.' + subject + '.examsScore';
            // let totalScore = 'data.' + subject + '.totalScore';
            // let data = [

            // ]
            // data.push(subject)

            // let prince = {
            //     data : []
            // }
            // prince.data[subject] = req.body
            // prince.data.push(subject)

            // data.marks[subject] = req.body;
            // console.log(data)
            // let data = new marks(req)
            let insertedMarks = await db.collection(currentClass).updateOne({_id: id}, {$set: {[subject]:  {classScore: req.body.classScore, examScore: req.body.examScore, totalScore: req.body.totalScore}}} ) 
            // [classScore] : req.body.classScore, [examsScore]: req.body.examScore, [totalScore]: req.body.totalScore
            console.log(insertedMarks);
            res.send(insertedMarks);

        }catch(err){
            console.log(err)
        }

    }

    return {get, post, postMarks}
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