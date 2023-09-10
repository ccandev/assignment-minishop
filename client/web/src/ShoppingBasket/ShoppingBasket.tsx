import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ShoppingBasket as BasketType } from "./ShoppingBasket.types";
import { gql, useMutation } from "@apollo/client";
import { PlaceOrderMutation } from "../../../generated/graphql";

const orderMutation = gql(`
	mutation PlaceOrder($order: OrderInput!) {
		placeOrder(order: $order) {
			customerId
			orderId
			products {
				amount
				ean
			}
			timestamp
			totalSum
		}
	}
`);

export const ShoppingBasket = ({
  products,
  handleSuccess,
}: {
  products: BasketType;
  handleSuccess: () => void;
}) => {
  const [placeOrder, { data }] = useMutation<PlaceOrderMutation>(orderMutation);

  const handleConfirm = () => {
    placeOrder({
      variables: { order: { customerId: "customer-1", products } },
    });
  };
  useEffect(() => {
    if (data) {
      handleSuccess();
    }
  }, [data]);

  return (
    <Box>
      <Typography variant="h5">Your Order</Typography>
      {products.map((product) => (
        <Box key={product.ean}>
          {product.ean} - {product.amount} kpl
        </Box>
      ))}

      <Button onClick={handleConfirm}>Confirm Order</Button>
    </Box>
  );
};
