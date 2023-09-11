import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { OrderedProduct } from "../../../../generated/graphql";

type Props = {
  name: string;
  ean: string;
  price: number;
  imageUrl: string;
  addToBasket: (item: OrderedProduct) => void;
  removeFromBasket: (item: OrderedProduct) => void;
};

export function ProductCard({
  name,
  ean,
  price,
  imageUrl,
  addToBasket,
  removeFromBasket,
}: Props) {
  return (
    <Card sx={{ width: "32%", marginBottom: "1rem" }}>
      <CardMedia component="img" alt={name} height="140" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2">{`€${price.toFixed(2)}`}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => removeFromBasket({ ean, amount: 1 })}
        >
          -
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => addToBasket({ ean, amount: 1 })}
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
}
