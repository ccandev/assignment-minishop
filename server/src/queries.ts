import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, _args, _context) => {
    // TODO: Calulate sum, only return orders for requested user

    return orders.map((order) => ({
      ...order,
      totalSum: order.products.reduce(
        (sum, product) =>
          sum +
          product.amount * products.find((p) => p.ean === product.ean).price,
        0
      ),
    }));
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
