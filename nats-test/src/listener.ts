import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'),{
  url: 'http://localhost:4222',
});

stan.on('connect', ()=>{
  console.log('Listener connected to NATS');

  stan.on('close', ()=>{
    console.log('NATS connection closed!');
    process.exit();
  });

  const options=stan
    .subscriptionOptions()
    .setManualAckMode(true);
  const subscription = stan.subscribe('ticket:created', ///channel
   'orders-service-queue-group', //subscription-goup
   options
   );
  subscription.on('message', (msg: Message)=>{ //message for event it a keyword not a string
    console.log('message received');
    const data=msg.getData();
    if(typeof data==='string'){
      console.log(
        `Received event #${msg.getSequence()}, with data: ${data}`
      );
    }
    msg.ack();
  });
});

process.on('SIGINT', ()=>stan.close()); //interupt signals handler
process.on('SIGTERM', ()=>stan.close()); //terminate signal handler























// import nats, { Message } from 'node-nats-streaming';
// import { randomBytes } from 'crypto';

// console.clear();

// const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
//   url: 'http://localhost:4222',
// });

// stan.on('connect', () => {
//   console.log('Listener connected to NATS');

//   stan.on('close', () => {
//     console.log('NATS connection closed!');
//     process.exit();
//   });

//   const options = stan
//     .subscriptionOptions()
//     .setManualAckMode(true)
//     .setDeliverAllAvailable()
//     .setDurableName('accounting-service');

//   const subscription = stan.subscribe(
//     'ticket:created',
//     'queue-group-name',
//     options
//   );

//   subscription.on('message', (msg: Message) => {
//     const data = msg.getData();
//     if (typeof data === 'string') {
//       console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
//     }

//     msg.ack();
//   });
// });

// process.on('SIGINT', () => stan.close());
// process.on('SIGTERM', () => stan.close());
