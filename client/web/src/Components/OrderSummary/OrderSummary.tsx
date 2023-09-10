import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ChevronRight, ShoppingBagOutlined } from "@mui/icons-material";

interface OrderSummaryProps {
  orderId: string;
  timestamp: string;
  totalSum: number;
}

export function OrderSummary({
  orderId,
  timestamp,
  totalSum,
}: OrderSummaryProps) {
  const formattedOrderDate = new Date(timestamp).toLocaleString();

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingBagOutlined />
        </ListItemIcon>
        <ListItemText primary={orderId} secondary={formattedOrderDate} />
        <ListItemText primary={`€${totalSum.toFixed(2)}`} />
        <ListItemIcon>
          <ChevronRight />
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
