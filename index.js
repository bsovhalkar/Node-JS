require("dotenv").config();

const express = require("express");

const mongoose = require('mongoose');

const server = express();

server.use(express.json());


const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.connectionURL);
        console.log("connectd to MongoDB atlas");
    } catch (error) {
        console.log("Something went wrong " + error.message);
        process.exit(1);
    }
}
connectDB();

const usetScheama = new mongoose.Schema({
    name : { type :String, required:true },
    emial :{type : String, required:true, unique: true},
    password : {type : String, required : true }
});


const User = mongoose.model('user',usetScheama);

const productSchema = new mongoose.Schema({
    name: { type:String, required:true},
    price: { type : Number, reqired:true},
    description:String
});

const Product = mongoose.model("product",productSchema);


const regUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const check = await User.find({email});
        if(check){
            res.status(400).send("User Already Exists !");
        }
        const user = await User.create({name,email,password});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const getUser = async (req,res)=>{
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


const addProduct = async (req,res) =>{
    try {
        const {name,price,description} = req.body;
        const product = await Product.create({name,price,description});
        res.send(201).json({product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const getProduct = async (req,res)=>{
    try {
        const products = await Product.find();
        res.send(products).status(201);
    } catch (error) {
        res.status(501).json({message:error.message});
    }
}

server.get('/product',getProduct);
server.post('/product',addProduct);


server.get('/user',getUser);
server.post('/user',regUser);

const cors = require("cors");
app.use(cors());

server.listen(process.env.PORT,()=>{
    console.log("Server Started !");
})
