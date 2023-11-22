import React, {useContext, useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom';
import { GlobalState } from "../../../etat";
import ProduitItems from "../utile/page/prod";




function DetailProduits (){

    const params = useParams();
    const state = useContext (GlobalState);
    const [products] = state.productsAPI.produit;
    const ajoutPanier = state.clientAPI.ajoutPanier;
    const [detailProduct, setDetailProduct] = useState ([]);

    useEffect (() =>{
        if (params.id){
            products.forEach(prod =>{
                if (prod._id === params.id) setDetailProduct(prod)
            })
        }
    },[params.id, products])

    if (detailProduct.length === 0) return null;

    return (
        <>
        <div className="detail" key = {detailProduct.id}>
            <img src = {detailProduct.images.url} alt = "" />

            <div className="box-detail">
                <div className="box">
                    <h2>{detailProduct.libelle}</h2>
                    <h6># {detailProduct.produit_id}</h6>
                </div>

                <span>{detailProduct.prix} CFA</span>
                <p>{detailProduct.description}</p>
                <br />
                <p>{detailProduct.contenu}</p>
                <Link to = "/panier" className="panier" onClick={() => ajoutPanier(detailProduct)}>Buy</Link>
            </div>
        </div>

        <div>
            <h2>Produits similaires</h2>
            <div className="produit">
                {
                    products.map(prod => {
                        return prod.category === detailProduct.category 
                        ? <ProduitItems key={prod._id} prod = {prod} /> :null
                    })
                }
            </div>

        </div>

        </>
            
    )
}

export default DetailProduits;