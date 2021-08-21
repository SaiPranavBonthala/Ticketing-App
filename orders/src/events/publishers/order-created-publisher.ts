import { Publisher, OrderCreatedEvent, Subjects } from "@bspticketsapp/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
