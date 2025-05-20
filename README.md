## Application Rules

- [ ] The application must have two types of users: delivery person and/or admin.
- [ ] It must be possible to log in using CPF and password.
- [ ] It must be possible to perform CRUD operations for couriers.
- [ ] It must be possible to perform CRUD operations for orders.
- [ ] It must be possible to perform CRUD operations for recipients.
- [ ] It must be possible to mark an order as "Pending" (available for pickup).
- [ ] It must be possible to pick up an order.
- [ ] It must be possible to mark an order as delivered.
- [ ] It must be possible to mark an order as returned.
- [ ] It must be possible to list orders with delivery addresses near the delivery person's location.
- [ ] It must be possible to change a user's password.
- [ ] It must be possible to list a user's deliveries.
- [ ] It must be possible to notify the recipient whenever the order status changes.

## Business Rules

- [ ] Only admin users can perform CRUD operations on orders.
- [ ] Only admin users can perform CRUD operations on delivery persons.
- [ ] Only admin users can perform CRUD operations on recipients.
- [ ] To mark an order as delivered, it is mandatory to send a photo.
- [ ] Only the delivery person who picked up the order can mark it as delivered.
- [ ] Only the admin can change a user's password.
- [ ] A delivery person must not be able to list another delivery person's orders.