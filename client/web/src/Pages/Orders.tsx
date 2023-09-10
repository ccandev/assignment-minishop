import { useQuery } from "@apollo/client";
import { Box, List, Typography } from "@mui/material";
import React from "react";
import { gql } from "../../../generated";
import { OrderSummary } from "../Components/OrderSummary/OrderSummary";

const ordersQuery = gql(`
  query getOrders($customerId: ID!) {
    orders(customerId: $customerId) {
      orderId
      customerId
      timestamp
      products {
        amount
        ean
      }
      totalSum
    }
  }`);

export function Orders() {
  const { loading, data } = useQuery(ordersQuery, {
    fetchPolicy: "cache-and-network",
    variables: { customerId: "customer-1" },
  });

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Box sx={{ borderBottom: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Order History
        </Typography>
      </Box>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <List>
          {data?.orders?.map((order) => (
            <OrderSummary
              key={order.orderId}
              orderId={order.orderId}
              timestamp={order.timestamp}
              totalSum={order.totalSum}
            />
          ))}
        </List>
      )}
    </Box>
  );
}
