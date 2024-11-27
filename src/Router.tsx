import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PinPage from "./pages/PinPage";
import { useState } from 'react'

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/pin/:id",
      element: <PinPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;