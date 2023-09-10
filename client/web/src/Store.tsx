import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { gql } from "../../generated";
import { ProductCard } from "./ProductCard";
import { useShoppingBasket } from "./ShoppingBasket/useShoppingBasket";

const getProductsQuery = gql(`
  query getProducts {
    products {
      ean
      name
      price
    }
  }
`);

export function Store() {
  const { addItem, removeItem } =
    useOutletContext<ReturnType<typeof useShoppingBasket>>();

  const { loading, data } = useQuery(getProductsQuery);

  const displayData = () => {
    if (!data) {
      return <p>No Products</p>;
    }

    return data.products.map((product) => (
      <ProductCard
        key={product.ean}
        name={product.name}
        ean={product.ean}
        price={product.price}
        addToBasket={addItem}
        removeFromBasket={removeItem}
      />
    ));
  };

  return (
    <>
      <Typography variant="h2">Available products</Typography>
      {loading ? <p>Loading products...</p> : displayData()}
    </>
  );
}
