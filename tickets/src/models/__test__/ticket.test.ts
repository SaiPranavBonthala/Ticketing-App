import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Creates an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Save the first fetched ticket
  await firstInstance!.save();

  // Save the second fetched ticket and expect an Error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();

  expect(ticket.version).toEqual(1);
});
