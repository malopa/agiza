"use client"
const { createContext, useState, useContext } = require("react");

const RoomContext = createContext()

export function RoomContextProvider({children}){
    const [roomName,setRoomName] = useState(null)
    return <RoomContext.Provider value={{roomName,setRoomName}}>
        {children}
    </RoomContext.Provider>
}  

export const useRoomContext = ()=> useContext(RoomContext)