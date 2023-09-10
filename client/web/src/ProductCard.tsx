import Button from "@mui/material/Button";
import React from "react";
import { OrderedProduct } from "../../generated/graphql";

type Props = {
  name: string;
  ean: string;
  price: number;
  addToBasket: (item: OrderedProduct) => void;
  removeFromBasket: (item: OrderedProduct) => void;
};

export function ProductCard({
  name,
  ean,
  price,
  addToBasket,
  removeFromBasket,
}: Props) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{ean}</p>
      <p>{price} €</p>
      <Button
        variant="contained"
        onClick={() => addToBasket({ ean, amount: 1 })}
      >
        +
      </Button>
      <Button
        variant="contained"
        onClick={() => removeFromBasket({ ean, amount: 1 })}
      >
        -
      </Button>
    </div>
  );
}
