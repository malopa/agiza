"use client"
const { createContext, useState, useContext } = require("react");

const UserContext = createContext()

export function UserContextProvider({children}){
    const [user,setUser] = useState(null)
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}  

export const useUserContext = ()=> useContext(UserContext)