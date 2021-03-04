let jwt = require('jsonwebtoken');
let config = require('../config');


function position(){
        
    async function authorize(req, res, next){
        if(!req.header('Authorization'))
        return res.send('no token')
    
    
       var token = req.header('Authorization').split(' ')[1]
    
       jwt.verify(token, config.secret, function(err, decoded){
           if(err) return res.send('incore tken');
           console.log(decoded, 'from decoded');
           req.query.teachers_Id = decoded.id
       })
        next()

    }

        return { authorize }
    }

    module.exports = position()
   