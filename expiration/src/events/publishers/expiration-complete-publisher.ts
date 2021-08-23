import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@bspticketsapp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
