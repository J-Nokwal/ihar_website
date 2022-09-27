import { createContext, useEffect, useState } from 'react'
import {appAuth} from '../firebase/AppAuth'
export const AppAuthContext=createContext() 
export const AppAuthContextProvider=({children})=>{
    const [currentAppAuth, setCurrentAppAuth] = useState({appAuth})
    const [currentUser, setcurrentUser] = useState({})
//     useEffect(() => {

//    appAuth.AuthChangeFunction=(user)=>{
//     setcurrentUser(user);
//    }
//     return ()=>{}
//     }, [])
    
    return (
        <AppAuthContext.Provider value={{currentAppAuth,currentUser}}>
            {children}
        </AppAuthContext.Provider>)
}