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
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </ThemeProviderComponent>
  )
}

export default App
