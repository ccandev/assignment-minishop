import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, args, _context) => {
    return orders
      .filter((order) => order.customerId === args.customerId)
      .map((order) => ({
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
