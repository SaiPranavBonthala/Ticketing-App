import { Publisher, Subjects, TicketCreatedEvent } from "@bspticketsapp/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
