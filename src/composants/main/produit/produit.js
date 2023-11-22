import React, {useContext, useEffect} from "react";
import axios from "axios";
import { GlobalState } from "../../../etat";
import ProduitItems from "../utile/page/prod";
import Filtrage from "./filtre";


function Produits (){

    const state = useContext (GlobalState);
    const [produit, setProduits] = state.productsAPI.produit;
    const [isAdmin] = state.clientAPI.isAdmin;
    const [isVender] = state.clientAPI.isVender;
    const [token] = state.token;
    const [clbk, setClbk] = state.productsAPI.clbk;

    

    useEffect (() =>{
        const fetchProduit = async () =>{
            const result = await axios.get('https://mern-e-com-idshop.vercel.app/api/produit')
            setProduits(result.data.produit);
            console.log(result.data.result);
        }
        fetchProduit()
    },[setProduits, clbk])

    return (
        <>
        <Filtrage />
            <div className="produit">
            
                {
                    produit.map(prod => { 
                        return <ProduitItems key={prod._id} prod = {prod} 
                        isAdmin={isAdmin}
                         isVender={isVender}
                          token={token}
                           clbk={clbk}
                            setClbk={setClbk} />
                    })
                }
            
            </div>
        </>
        
    )
}

export default Produits;