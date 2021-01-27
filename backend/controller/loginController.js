const {MongoClient} = require('mongodb')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let config = require('../config')
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )


function loginController(){
    async function post(req, res){
        let credentials = req.body
        try{
            await client.connect();
            const db = client.db(dbName);
            let username = await db.collection('register').findOne({email: credentials.email})
            if(!username)
            return res.status(401).send({message: 'invalid username please try again'})
            bcrypt.compare(credentials.password, username.password, (err, isMatch) => {
                if(!isMatch)
                return res.status(401).send({message: 'username and password do not match'})
                
                // let payload = {sub: username.id}
                let token = jwt.sign({id:username._id}, config.secret)
                res.status(200).send({auth: true, token})
            })  
        }catch(err){
            res.sendStatus(400);
        }

    }

    return {post}
}


module.exports = loginController()