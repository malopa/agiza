// context/authContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { getToken, getRefresh } from '../utils/retrieveToken';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(()=>{

    if(!refresh){
        let _token = getToken()
        if(_token){
            setToken(_token)
        }

        let user = getRefresh()
        if(user){
          setRefresh(user)
        }
    }

  },[refresh])
  

  return (
    <AuthContext.Provider value={{ refresh, setRefresh,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
