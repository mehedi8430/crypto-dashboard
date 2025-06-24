import { RouterProvider } from "react-router"
import { routes } from "./routes/Router"

function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App