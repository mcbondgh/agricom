import { BrowserRouter as Router} from "react-router-dom";
import { Flowbite} from "flowbite-react"
import AppRoutes from "@/routes/AppRoutes";
function App() {
 
  return (
    <Router>
       <Flowbite>
        <AppRoutes/>
      </Flowbite>
    </Router>
  )
}

export default App