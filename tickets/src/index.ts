import mongoose from "mongoose";

import { app } from './app';

const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URL){
        throw new Error('MONGO_URL Must be defined');
    }
    try { 
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    } as any); 
    console.log('Connected to Mongodb');      
    } catch (err){
        console.error(err);
    }

    app.listen(3000, () =>{
        console.log('Listening on port 3000!');
    });
};

start();