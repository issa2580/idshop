import React, {useContext} from "react";
import {Link} from 'react-router-dom'
import { GlobalState } from "../../../../etat";
import View from './icons/view.svg';
import Buy from './icons/buy.svg';
import Update from './icons/update.svg';
import Delete from './icons/delete.svg';



function ProdRender ({prod, supProduit}){

    const state = useContext (GlobalState);
    const [isAdmin] = state.clientAPI.isAdmin;
    const [isVender] = state.clientAPI.isVender;
    const addPanier = state.clientAPI.addPanier;

    return (
        
        <div className="icons">
            {
                isAdmin ?
                <>
                    
                    <Link className="icons-buy" to = "#!" onClick={supProduit}>
                        <img src = {Delete} alt = "" width = '10' height = '10' />
                    </Link>
                    <Link className="icons-view" to = {`/modif_prod/${prod._id}`}>
                        <img src = {Update} alt = "" width = '10' height = '10' />
                    </Link>
                    
                </>
                :isVender ?
                <>
                     <Link className="icons-buy" to = "#!" onClick={supProduit}>
                        <img src = {Delete} alt = "" width = '10' height = '10' />
                    </Link>
                    <Link className="icons-view" to = {`/modif_prod/${prod._id}`}>
                        <img src = {Update} alt = "" width = '10' height = '10' />
                    </Link>
                </>
                :<>
                    <Link className="icons-buy" to = "#!" onClick={() => addPanier (prod)}>
                    <img src = {Buy} alt = "" width = '10' height = '10' />
                    </Link>
                    <Link className="icons-view" to = {`/detail/${prod._id}`}>
                    <img src = {View} alt = "" width = '10' height = '10' />
                    </Link>
                </>
            }     
        </div>
    )
}

export default ProdRender;