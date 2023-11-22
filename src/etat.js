import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import ClientAPI from "./api/client";
import ProduitsAPI from "./api/produit";
import CategoryAPI from "./api/category";




export const GlobalState = createContext ();

export const State = ({ children }) =>{

    const [token, setToken] = useState (false);

   

    useEffect (() =>{
        const firstLogin = localStorage.getItem ('firstLogin');
        if (firstLogin){
            const refreshToken = async () =>{
                const result = await axios.get('https://mern-e-com-idshop.vercel.app/client/refresh_token');
                setToken (result.data.token)
                
                setTimeout(() =>{
                    refreshToken()
                }, 20 * 60 * 2000)
                
            }
            refreshToken ();
        }    
        
    },[setToken])

    const state = {
        token: [token, setToken],
        productsAPI: ProduitsAPI(),
        clientAPI: ClientAPI(token),
        categoryAPI: CategoryAPI(),
    }

    return (
        < GlobalState.Provider value={state}>
            { children }
        </GlobalState.Provider>
    )
}