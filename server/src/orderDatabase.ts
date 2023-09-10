import { Order, OrderInput } from "./generated/graphql";
import { products as productsDb } from "./productDatabase.js";

export const orders: Omit<Order, "totalSum">[] = [
  {
    orderId: "order-1",
    timestamp: "2023-08-22T15:05:10+0000",
    customerId: "customer-1",
    products: [
      { ean: "2000570800008", amount: 3 },
      { ean: "2000609200007", amount: 1 },
      { ean: "2000632900004", amount: 7 },
    ],
  },
  {
    orderId: "order-2",
    timestamp: "2023-08-25T13:08:16+0000",
    customerId: "customer-2",
    products: [
      { ean: "2000559900002", amount: 12 },
      { ean: "2005029300009", amount: 10 },
    ],
  },
  {
    orderId: "order-3",
    timestamp: "2023-08-28T10:01:16+0000",
    customerId: "customer-1",
    products: [
      { ean: "2000519200005", amount: 8 },
      { ean: "2000503700009", amount: 6 },
      { ean: "2000632900004", amount: 1 },
      { ean: "2005029300009", amount: 4 },
    ],
  },
];

export const addOrder = ({ customerId, products }: OrderInput): Order => {
  const lastOrderId = orders[orders.length - 1].orderId;

  const newOrderId = `order-${Number(lastOrderId.split("-")[1]) + 1}`;
  const newOrderDate = new Date().toISOString();

  const newOrder: Omit<Order, "totalSum"> = {
    orderId: newOrderId,
    timestamp: newOrderDate,
    customerId,
    products,
  };

  orders.push(newOrder);

  return {
    ...newOrder,
    totalSum: products.reduce((sum, product) => {
      const { ean, amount } = product;
      const price = productsDb.find((p) => p.ean === ean)?.price || 0;
      return sum + price * amount;
    }, 0),
  };
};

export const getOrderByOrderId = (
  orderId: string
): Omit<Order, "totalSum"> | undefined => {
  return orders.find((order) => order.orderId === orderId);
};
