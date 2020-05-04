const jwt = require('jsonwebtoken');
const key = require('../key');
const UserSchema = require("../model/user");


function checkToken(req,res,next){
    let token = req.headers.token;
    console.log('Token::::>>>>>',token);
    if((token == undefined) || (token == null)){
        return res.json("session expired Try to log in again");
    }else{
        jwt.verify(token,key.secretkey,(err,data)=>{
            if(err){
                console.log(err);
                return res.json("session expired Try to log in again")
            }else{
                console.log(data);
                let id = data.id;
                UserSchema.findById({'_id' : id},(err,result)=>{
                    console.log('result ::: >>>',result);
                    req.user = result
                    next();
                })
               
            }
        })
    }
}

module.exports={
    checkToken
}