import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Board from "./pages/board";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/board",
    element: <Board />,
  },
]);

function App() {
  const [loginState, setLoginState] = useState<boolean>(false);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
