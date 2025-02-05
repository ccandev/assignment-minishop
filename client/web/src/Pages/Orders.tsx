import { useQuery } from "@apollo/client";
import { Box, List, Paper, Skeleton, Typography } from "@mui/material";
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
    <Paper variant="elevation">
      <Box sx={{ marginTop: "2rem" }}>
        <Box sx={{ borderBottom: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, padding: "1rem" }}>
            Order History
          </Typography>
        </Box>

        {loading ? (
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Skeleton animation="wave" variant="rectangular" height={60} />
            <Skeleton animation="wave" variant="rectangular" height={60} />
            <Skeleton animation="wave" variant="rectangular" height={60} />
          </Box>
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
    </Paper>
  );
}
