import { Publisher, Subjects, TicketCreatedEvent } from "@selmathistckt/common";
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated=Subjects.TicketCreated;
}