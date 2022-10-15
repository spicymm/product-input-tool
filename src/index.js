import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { InputForm } from "./components/InputForm";
import { DataPage } from "./components/DataPage";

const DASHBOARD_RESPONSE = "dashboardResponse";
const PRODUCT_RESPONSE = "productResponse";
const STORED_PRODUCTS = "storedProducts";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "form",
        element: (
          <InputForm
            DASHBOARD_RESPONSE={DASHBOARD_RESPONSE}
            PRODUCT_RESPONSE={PRODUCT_RESPONSE}
            STORED_PRODUCTS={STORED_PRODUCTS}
          />
        ),
      },
      {
        path: "data",
        element: (
          <DataPage
            DASHBOARD_RESPONSE={DASHBOARD_RESPONSE}
            PRODUCT_RESPONSE={PRODUCT_RESPONSE}
            STORED_PRODUCTS={STORED_PRODUCTS}
          />
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
