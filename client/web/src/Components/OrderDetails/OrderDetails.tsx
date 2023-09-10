import { gql, useQuery } from "@apollo/client";
import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetOrderDetailsQuery } from "../../../../generated/graphql";
import { getProductsQuery } from "../../Store";

const getOrderDetailsQuery = gql(`
  query getOrderDetails($orderId: ID!) {
		order(orderId: $orderId) {
      orderId
      timestamp 
      customerId
      products {
				ean
				amount
      }
			totalSum
    }
  }
`);

export const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: orderData } = useQuery<GetOrderDetailsQuery>(
    getOrderDetailsQuery,
    {
      variables: {
        orderId,
      },
    }
  );
  const { data: productsData } = useQuery(getProductsQuery);

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Order History
        </Typography>
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Button
          variant="text"
          startIcon={<ChevronLeft />}
          onClick={() => navigate("/orders")}
          sx={{ textTransform: "unset" }}
        >
          Back to order history
        </Button>
        <Typography variant="h6" sx={{ fontWeight: 700, marginTop: "1rem" }}>
          {orderId}
        </Typography>
        <Typography variant="body1">
          Order placed: {orderData?.order?.timestamp}
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "1rem", fontWeight: 700 }}>
          Items
        </Typography>
        <Divider />
        <List>
          {orderData?.order?.products.map((orderedProduct) => {
            const product = productsData?.products?.find(
              (p) => p.ean === orderedProduct.ean
            );
            if (!product) {
              return null;
            }

            return (
              <ListItem disablePadding key={orderedProduct.ean}>
                <ListItemText primary={product.name} sx={{ width: "80%" }} />
                <ListItemText
                  primary={`${product.price}`}
                  sx={{ width: "5%", textAlign: "right" }}
                />
                <ListItemText
                  primary={`x${orderedProduct.amount}`}
                  sx={{ width: "5%", textAlign: "right" }}
                />
                <ListItemText
                  primary={(product.price * orderedProduct.amount).toFixed(2)}
                  sx={{ width: "10%", textAlign: "right" }}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, marginTop: "1rem" }}
          >
            Total sum
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, marginTop: "1rem" }}>
            {`€${orderData?.order?.totalSum.toFixed(2)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
