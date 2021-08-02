import { Publisher, Subjects, TicketUpdateEvent } from "@bspticketsapp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent> {
  readonly subject = Subjects.TicketUpdated;
}
