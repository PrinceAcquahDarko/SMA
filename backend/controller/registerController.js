const {MongoClient} = require('mongodb')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
let config = require('../config');
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )

function registerController(){
    async function post(req, res){
        let userData = {}
        let hashedPassword = bcrypt.hashSync(req.body.passwordGroup.password, 8);
        userData.firstname = req.body.firstname
        userData.lastname = req.body.lastname
        userData.email = req.body.email
        userData.password = hashedPassword
        userData.position = req.body.position
        // let regCredentials = req.body;
        // regCredentials.password = hashedPassword
        try{
            await client.connect();
            const db = client.db(dbName);
            let registeredData = await db.collection('register').insertOne(userData)
            console.log(registeredData)
            let token = jwt.sign({id:registeredData._id}, config.secret)
            res.status(200).send({auth: true, token})
            
        }catch(error){
            console.log(error)
        }
    }
    function validate(req, res, next){
        // we gonna do all sorts of validations here
        if (req.body === null){
            return;
        }
        next();
    }

    return {post, validate}
}


module.exports = registerController()