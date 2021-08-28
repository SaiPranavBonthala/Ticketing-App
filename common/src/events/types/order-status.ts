export enum OrderStatus {
  // When the Order has been created but
  // the Ticket it is trying to order has not been reserved
  Created = "created",

  // The ticket that order is trying to reserve has already
  // been reserved, or when the user has cancelled the order
  // The order expires before Payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has reserved the ticket and the payment has been successfully completed by User
  Complete = "complete",
}
