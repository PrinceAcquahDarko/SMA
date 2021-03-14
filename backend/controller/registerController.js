const {MongoClient, ObjectID} = require('mongodb')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
let config = require('../config');
const url = 'mongodb://localhost:27017'
const dbName = "SMA"
const client = new MongoClient(url,  { useUnifiedTopology: true } )

function registerController(){
    async function post(req, res){
        let hashedPassword = bcrypt.hashSync(req.body.passwordGroup.password, 8);
        let users_Data = new userData(req.body, hashedPassword)
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
            const id2 = ObjectID(req.query.teachers_Id)
            let registeredData = await db.collection('register').updateOne({_id: id2}, { $set: { data }})

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
            const id = ObjectID(req.query.teachers_Id)
            const data = await db.collection('register').find( {_id:id} );
            const items = await data.toArray()
            console.log(items)
            // for temporal usage
           
            res.send(items)
       }catch(err){
           res.send(err)
       }   
    }
    async function getAllData(req, res){
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

    async function deleteStaff(req, res){
        try{
            await client.connect();
            const db = client.db(dbName);
            const id = ObjectID(req.query.staffId)
            const data = await db.collection('register').deleteOne( {_id: id} );
            // for temporal usage
           console.log(data)
            res.send(data)
       }catch(err){
           res.send(err)
       }   
    }


    function authorization(req, res, next){
    
        if(!req.header('Authorization'))
        return res.send('no token')
    
    
       var token = req.header('Authorization').split(' ')[1]
       console.log(token, 'from token');
    
       jwt.verify(token, config.secret, function(err, decoded){
           if(err) return res.send('incore tken');
           console.log(decoded, 'from decoded');
           req.query.teachers_Id = decoded.id
       })

       next()
           
    }

    return {post, validate, update, get, authorization, getAllData, deleteStaff}
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