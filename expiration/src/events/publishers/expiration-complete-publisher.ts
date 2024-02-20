import { ExpirationCompleteEvent, Publisher, Subjects } from "@selmathistckt/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;
}