const {MongoClient} = require('mongodb')
let bcrypt = require('bcryptjs')
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )

function registerController(){
    async function post(req, res){
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let regCredentials = req.body;
        regCredentials.password = hashedPassword
        try{
            await client.connect();
            const db = client.db(dbName);
            let registeredData = await db.collection('register').insertOne(regCredentials)
            console.log(registeredData)
            res.status(200).send(registeredData.ops)
            
        }catch(error){
            console.log(error)
        }
    }

    return {post}
}


module.exports = registerController()