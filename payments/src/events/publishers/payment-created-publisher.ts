import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@bspticketsapp/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
