const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017' ;
const dbName = 'SMA';
const client =   new MongoClient(url,  { useUnifiedTopology: true } )

function adminController(){
   async function post(req, res){
        try{
            await client.connect();
            const db = client.db(dbName)
            const insertedData = await db.collection('admin').insertOne(req.body);
            console.log(insertedData);
            res.send(insertedData)
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
            // for temporal usage
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