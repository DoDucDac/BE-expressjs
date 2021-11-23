const db = require('../models')
const account1 = db.Account;
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
function signUp(req,res) {
    account1.findOne({where: {account: req.body.account}}).then(result =>{
        if(result){
            res.status(409).json({
                message: "Account already exists!",
            });
        }
        else{
            bcryptjs.genSalt(10,function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const account = {
                        account: req.body.account,
                        password: hash,
                        email: req.body.email,
                        score: req.body.score,
                        role: req.body.role
                    }
                    account1.create(account).then(result=>{
                        res.status(201).json({
                            message: "Account created successfully",
                        });
                    }).catch(error =>{
                        res.status(500).json({
                            message: "Something went wrong",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
        });
    });
}

/***************************************************************************** 
function name: login
description: authentication(all user can access this request)
input parameters: 
    req.body.account
    req.body.password
output: response
    401: invalid credentials
    200: Authentication successful!  && token
    500: Internal server error
******************************************************************************/
function login(req, res){ 
        account1.findOne({where:{account: req.body.account}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, (err, result) =>{
                if(result){
                    const token = jwt.sign({
                        role: user.role,
                        account: user.account
                    }, process.env.JWT_KEY, (err, token)=>{
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

function topScore(req,res){
   
}
module.exports = {
    signUp: signUp,
    login: login,
    topScore: topScore
}