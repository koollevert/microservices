import express, { Request, Response } from "express";
import {body} from 'express-validator';
import { Order } from "../models/order";
import { requireAuth, validateRequest, BadRequestError, NotFoundError, NotAuthorizedError, OrderStatus } from "@selmathistckt/common";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post('/api/payments',
    requireAuth,
    [
        body('token')
            .not()
            .isEmpty(),
        body('orderId')
            .not()
            .isEmpty()
    ],
    validateRequest,
    async(req: Request, res: Response)=>{
        const { token, orderId}=req.body; //pulling off from the req body

        const order = await Order.findById(orderId); //storing oderId from Order to order

        if(!order){
            throw new NotFoundError();
        }

        if(order.userId!=req.currentUser!.id){
            throw new NotAuthorizedError();
        }


        if (order.status===OrderStatus.Cancelled){
            throw new BadRequestError('Cannot pay for an cancelled order');
        }

        const charge = await stripe.charges.create({
            currency: 'kes',
            amount: order.price*100,
            source: token
        });
        const payment=Payment.build({
            orderId,
            stripeId: charge.id,
        });
        await payment.save();
        new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
        });

        res.status(201).send({success: true, id: payment.id});
    }
);

export {router as createChargeRouter};










