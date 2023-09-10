import { gql, useQuery } from "@apollo/client";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { useShoppingBasket } from "./ShoppingBasket/useShoppingBasket";
import { GetProductsQuery } from "../../generated/graphql";

export const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      name
      price
      imageUrl
    }
  }
`);

export function Store() {
  const { addItem, removeItem } =
    useOutletContext<ReturnType<typeof useShoppingBasket>>();

  const { loading, data } = useQuery<GetProductsQuery>(getProductsQuery);

  const displayData = () => {
    if (!data) {
      return <p>No Products</p>;
    }

    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2%" }}>
        {data.products.map((product) => (
          <ProductCard
            key={product.ean}
            name={product.name}
            ean={product.ean}
            price={product.price}
            imageUrl={product.imageUrl}
            addToBasket={addItem}
            removeFromBasket={removeItem}
          />
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: "1rem" }}>
        Available products
      </Typography>
      {loading ? <p>Loading products...</p> : displayData()}
    </Container>
  );
}
