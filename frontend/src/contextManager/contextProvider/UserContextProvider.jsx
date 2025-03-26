import PropTypes from "prop-types";
import { UserContext } from "../context/AppContext";
import { useState } from "react";
import UserImg from "/user.jpg"

export function UserContextProvider({children}) {
    const [user, setUser] = useState({ 
        name: "David Benson",
        email: "richard39@yahoo.com",
        image: UserImg,
        role: "admin"
    });//has to be null. Just setting default user for test ing purpose
    const [loading, setLoading] = useState(false);
  return (
    <UserContext.Provider value={{user , setUser , loading ,setLoading}}>
        {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
 

