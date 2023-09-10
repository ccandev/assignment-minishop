import { useCallback, useMemo, useState } from "react";
import { ShoppingBasket } from "./ShoppingBasket.types";
import { OrderedProduct } from "../../../generated/graphql";

export const useShoppingBasket = () => {
  const [state, setState] = useState<ShoppingBasket>([]);

  const addItem = useCallback(
    (item: OrderedProduct) => {
      if (state.find((product) => product.ean === item.ean)) {
        setState(
          state.map((product) => {
            if (product.ean === item.ean) {
              return {
                ...product,
                amount: product.amount + item.amount,
              };
            }
            return product;
          })
        );
      } else {
        setState([...state, item]);
      }
    },
    [state]
  );

  const removeItem = useCallback(
    (item: OrderedProduct) => {
      if (
        state.find((product) => product.ean === item.ean && product.amount > 1)
      ) {
        setState(
          state.map((product) => {
            if (product.ean === item.ean) {
              return {
                ...product,
                amount: product.amount - item.amount,
              };
            }
            return product;
          })
        );
      } else {
        setState(state.filter((product) => product.ean !== item.ean));
      }
    },
    [state]
  );

  const clearBasket = () => {
    setState([]);
  };

  return {
    addItem,
    removeItem,
    clearBasket,
    shoppingBasket: state,
  };
};
