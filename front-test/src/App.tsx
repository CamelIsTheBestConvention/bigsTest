import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Board from "./pages/board";
import Write from "./pages/write";
import BoardDetail from "./pages/boardDetail";
import Edit from "./pages/edit";

function App() {
  const token = sessionStorage.getItem("accessToken");

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/board" /> : <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/board",
      element: <Board />,
    },
    {
      path: "/board/:id",
      element: <BoardDetail />,
    },
    {
      path: "/board/edit",
      element: <Edit />,
    },
    {
      path: "/write",
      element: <Write />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
