import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("marks an Order as cancelled", async () => {
  // Create a ticket with Ticket model
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();

  // Make a request to create an Order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel the Order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send();
  expect(204);

  // expectation to make sure the Order is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();

  // Make a request to create an Order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to cancel the Order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send();
  expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
