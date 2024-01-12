import React, { useState, createContext, useReducer, useContext, useEffect } from 'react'


export const AuthContext = createContext()


export const initalState = { isAuth: false, user: {} }

const reducer = (state, action) => {
    switch (action.type) {
        case "Set_Logged_In":
            return { isAuth: true, user: action.payload.user }
        case "Set_Logged_Out":
            return initalState
        default:
            return state
    }
}


export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initalState)
    const [isApploading, setIsApploading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem("Token")
        // console.log("token", token)
        if (token === "true") {
            const user = JSON.parse(localStorage.getItem("User"))
            dispatch({ type: "Set_Logged_In", payload: { user } })
        }
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