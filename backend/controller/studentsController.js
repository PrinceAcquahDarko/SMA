const {MongoClient} = require('mongodb')
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

    return {get, post}
}

module.exports = studentsController();