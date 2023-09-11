import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ShoppingBasket as BasketType } from "./ShoppingBasket.types";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  GetProductsQuery,
  PlaceOrderMutation,
} from "../../../../generated/graphql";
import { getProductsQuery } from "../../Pages/Store";

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
  const { data: productsData } = useQuery<GetProductsQuery>(getProductsQuery);

  useEffect(() => {
    if (data) {
      handleSuccess();
    }
  }, [data]);

  const handleConfirm = () => {
    placeOrder({
      variables: { order: { customerId: "customer-1", products } },
    });
  };

  return (
    <Container
      sx={{
        height: "100%",
        padding: "1rem",
        marginTop: "2rem",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Your Order
        </Typography>
        {products.map((orderedProduct) => {
          const product = productsData?.products.find(
            (product) => product.ean === orderedProduct.ean
          );

          return (
            <Card
              sx={{
                display: "flex",
                marginBottom: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              elevation={0}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent
                  sx={{ flex: "1 0 auto", justifyContent: "space-between" }}
                >
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{ fontWeight: 700 }}
                  >
                    {orderedProduct.amount} x {product?.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {`€${(product?.price! * orderedProduct.amount).toFixed(2)}`}
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 80, height: 60 }}
                image={product?.imageUrl}
                alt={product?.name}
              />
            </Card>
          );
        })}
      </Box>

      <Button onClick={handleConfirm} variant="contained">
        Confirm Order
      </Button>
    </Container>
  );
};
