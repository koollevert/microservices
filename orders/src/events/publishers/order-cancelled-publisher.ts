import { Subjects, Publisher, OrderCancelledEvent } from "@selmathistckt/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled=Subjects.OrderCancelled;
}