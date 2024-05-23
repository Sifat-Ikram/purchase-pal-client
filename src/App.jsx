import { Outlet } from "react-router-dom"
import Navbar from "./components/shared/navbar/Navbar"


function App() {

  return (
    <div>
      <Navbar />
      <div className="min-h-screen my-20 relative">
        <Outlet />
      </div>
    </div>
  )
}

export default App
