import React from "react";
import { useContext } from "react";
import { Routes ,Route } from 'react-router-dom';
import { GlobalState } from "../../etat";
import AddProduit from "./addProduct/produit";
import AddProduitV from "./addProduct/produitV";
import Login from "./auth/login";
import Register from "./auth/register";
import Category from "./category/category";
import Commande from "./commande/commande";
import DetailCommande from "./commande/detailCommande";
import DetailProduits from "./detail/detailProduits";
import Panier from "./panier/panier";
import Payement from "./panier/payement";
import Produits from "./produit/produit";
import NotFound from "./utile/page/notFound";




function Main (){

    const state = useContext(GlobalState);
    const [isLogin] = state.clientAPI.isLogin;
    const [isAdmin] = state.clientAPI.isAdmin;
    const [isVender] = state.clientAPI.isVender;

    return (
        <Routes>
            <Route index path = '/' element = {<Produits />} />
            <Route index path = '/detail/:id' element = {<DetailProduits />} />

            <Route index path = '/login' element = {isLogin ? <NotFound /> : <Login />} />
            <Route index path = '/register' element = {isLogin ? <NotFound /> : <Register />} />

            <Route index path = '/category' element = {isAdmin ? <Category /> : <NotFound />} />
            <Route index path = '/create_prod' element = {isAdmin ? <AddProduit /> : <NotFound />} />
            <Route index path = '/modif_prod/:id' element = {isAdmin ? <AddProduit /> : <NotFound />} />

            <Route index path = '/categoryV' element = {isVender ? <Category /> : <NotFound />} />
            <Route index path = '/create_prodV' element = {isVender ? <AddProduitV /> : <NotFound />} />
            <Route index path = '/modif_prodV/:id' element = {isVender ? <AddProduitV /> : <NotFound />} />

            <Route index path = '/panier' element = {<Panier />} />
            <Route index path = '/payement' element = {<Payement />} />

            <Route index path = '/history' element = {isLogin ? <Commande /> : <NotFound />} />
            <Route index path = '/history/:id' element = {<DetailCommande />} />
  
            <Route index path = '/*' element = {<NotFound />} />
        </Routes>
    )
}

export default Main;