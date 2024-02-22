import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCretedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URL){
        throw new Error('MONGO_URL Must be defined');
    }
///
    if (!process.env.NATS_CLIENT_ID){
        throw new Error('NAT_CLIENT_ID Must be defined');
    }

    if (!process.env.NATS_URL){
        throw new Error('NATS_URL Must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID Must be defined');
    }

    
    try { 
    await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL,
    );
    natsWrapper.client.on('close', ()=>{
        console.log('NATS connection closed!');
        process.exit();
    });
    process.on('SIGINT', ()=>natsWrapper.client.close());
    process.on('SIGTERM', ()=>natsWrapper.client.close());

    new OrderCretedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();


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