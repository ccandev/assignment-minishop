import { MutationResolvers } from "./generated/graphql";
import { addOrder } from "./orderDatabase.js";

export const mutations: MutationResolvers = {
  placeOrder: async (_, { order }) => {
    const newOrder = addOrder(order);
    return newOrder;
  },
};
