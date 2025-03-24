import { BrowserRouter as Router} from "react-router-dom";
import { Flowbite} from "flowbite-react"
import AppRoutes from "@/routes/AppRoutes";
import { UserContextProvider } from "@/contextManager/contextProvider/UserContextProvider";
function App() {
 
  return (
    <Router>
       <Flowbite>
        <UserContextProvider>
        <AppRoutes/>
        </UserContextProvider>
      </Flowbite>
    </Router>
  )
}

export default App