import CricketGame from "./components/game/CricketGame";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<CricketGame />} />)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
