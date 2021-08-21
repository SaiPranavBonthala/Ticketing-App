import {
  Subjects,
  OrderCancelledEvent,
  Publisher,
} from "@bspticketsapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
