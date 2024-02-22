import { Subjects, Publisher, PaymentCreatedEvent } from "@selmathistckt/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated=Subjects.PaymentCreated;
}