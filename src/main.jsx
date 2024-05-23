import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./components/pages/errorPage/ErrorPage.jsx";
import Home from "./components/pages/homePage/Home.jsx";
import Register from "./components/pages/sign/Register.jsx";
import LogIn from "./components/pages/sign/LogIn.jsx";
import AuthProvider from "./components/provider/AuthProvider.jsx";
import AllProduct from "./components/pages/product/AllProduct.jsx";
import ProductDetails from "./components/pages/productDetails/ProductDetails.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/allProduct",
        element: <AllProduct />
      },
      {
        path: "/details/:id",
        element: <ProductDetails />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
