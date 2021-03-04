const {MongoClient, ObjectID, ObjectId} = require('mongodb');
const url = 'mongodb://localhost:27017' ;
const dbName = 'SMA';
const client =   new MongoClient(url,  { useUnifiedTopology: true } )


function adminController(){
   async function post(req, res){
       
        try{
            await client.connect();
            const db = client.db(dbName)
            const UsersId = await db.collection('register').findOne({_id: ObjectId(req.query.teachers_Id)})
            if (UsersId.position === 'head'){
                const insertedData = await db.collection('admin').insertOne(req.body);
                return res.send(insertedData)
            }
            
            return res.send('You are not allowed to enter data');
        }catch(err){
            res.send(err)
        }
    }
   async function get(req, res){
       try{
            await client.connect();
            const db = client.db(dbName);
            const data = await db.collection('admin').find( {} );
            const items = await data.toArray()
            let prince = []
            prince.push(items[6])
            res.send(prince)
       }catch(err){
           res.send(err)
       }   
    }

    return {post, get}
}

module.exports = adminController();