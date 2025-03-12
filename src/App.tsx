import CricketGame from "./components/game/CricketGame";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { startTransition } from "react";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CricketGame />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
