import React, {useContext, useState} from "react";
import { GlobalState } from "../../../etat";

function Filtrage (){
    const state = useContext(GlobalState);
    const [category] = state.categoryAPI.category;
    const [categorie, setCategorie] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [rech, setRech] = state.productsAPI.rech;

    const handleCategory = e =>{
        setCategorie(e.target.value);
    }


    return (
        <div className="rech_menu">
            <div className="row">
                    <span>Filtrer: </span>
                    <select value={categorie} onChange={handleCategory} >
                        <option value=''>Tous les produits</option>
                        {
                            category.map(categorie =>(
                                <option value={"category=" + categorie._id} key={categorie._id}>
                                    {categorie.name}
                                </option> 
                            ))   
                        }  
                    </select>
            </div>

                <input type="text" value={rech} placeholder='Recherche un produit' onChange={e => setRech(e.target.value.toLowerCase())} />
   
                <div className="row sort">
                    <span>Trier:</span>
                    <select value={sort} onChange={e => setSort(e.target.value)} >
                        <option value="">Prix</option>
                        <option value='sort=+prix'>Moins cheres</option>
                        <option value='sort=-prix'>Plus cheres</option>
                    </select>
                </div>
            
        </div>
    )
}

export default Filtrage;