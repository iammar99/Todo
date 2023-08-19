import React, { useState, createContext, useReducer ,useContext , useEffect } from 'react'


export const AuthContext = createContext()


export const initalState = { isAuth: false, user: {} }

const reducer = (state,action) => {
    switch (action.type) {
        case "Set_Logged_In":
             return  { isAuth: true, user: action.payload.user }
        case "Set_Logged_Out":
             return  initalState 
        default:
             return state
    }
}


export default function AuthContextProvider({children}) {

    const [state, dispatch] = useReducer(reducer, initalState)
    const [isApploading, setIsApploading] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setIsApploading(false)
        }, 4000)
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ ...state, dispatch, isApploading }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => useContext(AuthContext)