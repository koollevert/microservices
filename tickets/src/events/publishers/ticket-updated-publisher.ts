import { Publisher, Subjects, TicketUpdatedEvent } from "@selmathistckt/common";
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated=Subjects.TicketUpdated;
}