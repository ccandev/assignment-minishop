import React from "react";

import { createRoot } from "react-dom/client";
import { Store } from "./Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Orders } from "./Pages/Orders";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { App } from "./App";

const gqlClient = new ApolloClient({
  uri: "http://localhost:4000",

  cache: new InMemoryCache(),
});
loadDevMessages();
loadErrorMessages();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Store />,
      },
      {
        path: "orders/",
        element: <Orders />,
      },
    ],
  },
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <ApolloProvider client={gqlClient}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
