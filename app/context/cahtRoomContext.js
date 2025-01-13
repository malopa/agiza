"use client"
const { createContext, useState, useContext } = require("react");

const ChatRoomContext = createContext()

export function ChatRoomContextProvider({children}){
    const [roomName,setRoomName] = useState(null)
    return <ChatRoomContext.Provider value={{roomName,setRoomName}}>
        {children}
    </ChatRoomContext.Provider>
}  

export const useChatRoomContext = ()=> useContext(ChatRoomContext)