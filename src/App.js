import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThemeProviderComponent } from "./context/ThemeContext"
import Dashboard from "./main/Dashboard"

function App() {
  return (
    <ThemeProviderComponent>
      <Dashboard />
      <ToastContainer
        position='top-right'
        autoClose={900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        style={{
          fontSize: "16px",
          fontWeight: "700",
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </ThemeProviderComponent>
  )
}

export default App
