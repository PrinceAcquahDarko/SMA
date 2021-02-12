const {MongoClient, ObjectID} = require('mongodb')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
let config = require('../config');
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )

function registerController(){
    async function post(req, res){
        // let userData = {}
        let hashedPassword = bcrypt.hashSync(req.body.passwordGroup.password, 8);
        let users_Data = new userData(req.body, hashedPassword)
        // userData.firstname = req.body.firstname
        // userData.lastname = req.body.lastname
        // userData.email = req.body.email
        // userData.password = hashedPassword
        // userData.position = req.body.position
        // let regCredentials = req.body;
        // regCredentials.password = hashedPassword
        try{
            await client.connect();
            const db = client.db(dbName);
            let registeredData = await db.collection('register').insertOne(users_Data)
            let token = jwt.sign({id:registeredData.ops[0]._id}, config.secret)
            res.status(200).send({auth: true, position:registeredData.ops[0].position, token})
            
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
     async function update(req, res){
        try{
            await client.connect();
            const db = client.db(dbName);
            const data = req.body
            // const id = ObjectID('601de19ce95fbb1d98b49a39')
            const id2 = ObjectID('6020484e64175c31887d3e07')
            let registeredData = await db.collection('register').updateOne({_id: id2}, { $set: { data }})
            // let registeredData = await db.collection('register').findOne({_id: id})

            res.send(registeredData)
            console.log(registeredData)
           
        }catch(error){
            console.log(error)
        };

    }

    async function get(req, res){
        try{
            await client.connect();
            const db = client.db(dbName);
            const data = await db.collection('register').find( {} );
            const items = await data.toArray()
            console.log(items)
            // for temporal usage
           
            res.send(items)
       }catch(err){
           res.send(err)
       }   
    }

    return {post, validate, update, get}
}


function userData(args, password){
    let data = {
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        password,
        position:args.position
    }

    return data
}


module.exports = registerController()