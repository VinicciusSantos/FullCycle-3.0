import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({ where: { order_id: entity.id } });

    entity.items.forEach(async (item) => {
      await OrderItemModel.create({
        order_id: entity.id,
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      });
    });

    await OrderModel.update(
      {
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findByPk(id, {
      include: [{ model: OrderItemModel }],
    });
    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
              )
          )
        )
    );
  }
}
