import { Publisher, OrderCreatedEvent, Subjects } from "@selmathistckt/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated;
}