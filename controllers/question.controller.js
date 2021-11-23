const Validator = require('fastest-validator');
const { basename } = require('path/posix');
const { set } = require('../app');
const db = require('../models')
const question1 = db.Question;
const account1 = db.Account;
const PAGE_SIZE = 5;
function save(req,res){
    const question = {
        question: req.body.question,
        A: req.body.A,
        B: req.body.B,
        C: req.body.C,
        D: req.body.D,
        answer: req.body.answer
    }
const schema = {
    question: {type: "string", optional: false, max: "200"},
    A: {type: "string", optional: false, max: "100"},
    B: {type: "string", optional: false, max: "100"},
    C: {type: "string", optional: false, max: "100"},
    D: {type: "string", optional: false, max: "100"},
    answer: {type: "string", optional: false, max: "2"},
}
const v = new Validator();
const validationResponse =  v.validate(question, schema);
    if(validationResponse !== true)
    {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }
    question1.create(question).then(result => {
        res.status(201).json({
            message: "Question created successfully",
            question: result
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
    }
    function show(req,res){
        const id = req.params.id;
        question1.findByPk(id).then(result =>{
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Question not found" 
            })
        }
        }).catch(error =>{
            res.status(500).json({
                message: "Something went wrong!"
        })
    });
}

function index(req,res){
    var page = req.query.page;
    if(page){
        page = parseInt(page);
        var skip = (page - 1)*PAGE_SIZE;
        question1.findAll({
            limit: PAGE_SIZE,
            offset: skip,
            where: {}
        }).then(result=>{
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json({
                message: "Something went wrong!"
            })
        });
    }else{
        question1.findAll().then(result =>{
        res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
            message: "Something went wrong!"
            });
        });
    }
}
function update(req,res){
    const id = req.params.id;
    const updatedQuestion = {
        question: req.body.question,
        A: req.body.A,
        B: req.body.B,
        C: req.body.C,
        D: req.body.D,
        answer: req.body.answer
    }
    const schema = {
        question: {type: "string", optional: false, max: "200"},
        A: {type: "string", optional: false, max: "100"},
        B: {type: "string", optional: false, max: "100"},
        C: {type: "string", optional: false, max: "100"},
        D: {type: "string", optional: false, max: "100"},
        answer: {type: "string", optional: false, max: "2"},
    }
    const v = new Validator();
    const validationResponse =  v.validate(updatedQuestion ,schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }
    question1.update(updatedQuestion,{ where: {id:id}}).then(result =>{
        res.status(200).json({
            message: "Question update successfully!",
            question: updatedQuestion
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        })
    })
}

function destroy(req,res) {
    const id = req.params.id;
    question1.destroy({where: {id:id}}).then(result =>{
        res.status(200).json({
            message: "Question deleted succesfully",
        })
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        })
    })
}
function checkKey(req,res) { 
    var score = 0;
    var answerList = [];
    var answer1 = [];   
    //console.log(req.userRole.account);
    question1.findAll().then((questions) => {  
        questions.forEach((question) => { 
            answerList.push(question.answer); 
        });
    req.body.forEach((answer)=>{
            answer1.push(answer.answer);
        });
    for(let i = 0; i < answerList.length; i++){
        if(answer1[i] === answerList[i]) {score++;}
    }
        res.status(200).json({score: score*10});
        account1.findOne({where: {account: req.userRole.account}}).then(result =>{
            result.score = score*10;
            result.save({ fields: ['score'] });
        })
    }).catch(error =>{
        res.status(404).json({
            message: 'Not found!' 
        })
    });
}


module.exports = {
    save: save, 
    show: show,  
    index: index,
    update: update,
    destroy: destroy,
    checkKey: checkKey
}







// function Fruit (_color, _name){
//     this.color = _color;
//     this.name = _name;
//     this.showName = function(){
//        console.log(this.name);
//     }
//  };

// const Banana = new Fruit('yellow', 'banana');
// Banana.showName(); //banana
// Banana.color; //yellow












var myApple = new Object();

//Thêm các thuộc tính cho đối tượng
myApple.color = 'red';
myApple.shape = 'round';
myApple.howSweet = function(){
   console.log('I am sweet');
};

myApple.prototype.big = 'Hello'


console.log(myApple.big);








