const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./module/user');
const Cetegories = require('./module/categories');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URL||'mongodb://localhost:27017/indiaSkill')
.then(()=>{
    console.log('connection Done!.');
})
.catch((err)=>{
    console.log(err);
})

// function check(req,res,next){
//     // console.log(req);
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(" ")[1];
//     console.log(token);
//    const is =jwt.verify(token,'mst'){
    
//    }
// }

// decoded

app.post('/api/auth/logout',(req,res)=>{
    res.send({"sucess":true, 'message':'Logged out successfully'});
})

app.get('/api/users/{id}', async (req,res) =>{
        // res.send({"message" : "working.."});
        const {id}=req.params;
        console.log(id);
    
})

app.get('/api/users',async(req,res)=>{
    const data =await User.find({});
    res.send({"sucess":true, 'data':data});

})

app.post('/api/health',async (req,res)=>{
    console.log(req.body);
    
})

app.post('/api/auth/register',async (req,res) =>{
    const {name , email , password , role}= req.body;
    if(!name || !email || !password || !role){
        res.send({"message":"invailde data.."});
    }
    try{
        const dbdata = new User({name , email , password , role});
       await dbdata.save();
        res.send({"sucess":true, 'message':'user registered successfully'});


    }catch(err){
        console.log(err);
        res.send({"message" : "server error.."});
    }
})

app.post('/api/categories',async (req,res) =>{
    const {name ,priority}= req.body;
    if(!name || !priority ){
        res.send({"message":"invailde data.."});
    }
    try{
        const dbdata = new Categories({name , priority});
       await dbdata.save();
        res.send({"sucess":true, 'message':'Category created'});


    }catch(err){
        console.log(err);
        res.send({"message" : "server error.."});
    }
})



app.post('/api/auth/login', async (req,res) =>{
    const {email , password}= req.body;
    if(!email || !password){
        res.send({"message":"invailde data.."});
    }
    try{

        const user = await User.find({email:email});
        const pass = await User.find({password:password});

        console.log(user);
        if(!user || !pass){
            res.send({"message":"User Not Find"});
        }
        // console.log(password,user.password);
        // if(password==user.password){
           
                const tocken = jwt.sign(
                {id:user._d},
                'mst')
                // await localStorage.setItem({'tocken':tocken});
                res.send({'success':true,'tocken':tocken});

            
        // }

    }catch(err){
        console.log(err);
        res.send({"message" : "server error.."});
    }
})

app.post('/api/auth/check', async (req,res) =>{
        res.send({"message" : "working.."});
    
})




app.listen(process.env.PORT||5000,()=>{
    console.log("app is working...");
})