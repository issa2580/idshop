import React, {useContext, useState} from "react";
import { GlobalState } from "../../etat";
import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Carte from './icons/carte.svg';
import { Link } from 'react-router-dom';
import axios from "axios";


function Header (){
    const state = useContext(GlobalState)
    const [isLogin] = state.clientAPI.isLogin;
    const [isAdmin] = state.clientAPI.isAdmin;
    const [isVender] = state.clientAPI.isVender;
    const [panier] =state.clientAPI.panier;
    const [menu, setMenu] =useState(false);

    const logoutClient = async () =>{
        await axios.get ('https://mern-e-com-idshop.vercel.app/client/logout')
        localStorage.removeItem ('firstLogin')
        window.location.href = "/";
    }

    const venderRoute = () =>{
        return (
            <>
                <li><Link to = "https://mern-e-com-idshop.vercel.app/create_prodV">Ajout Produit</Link></li>
                <li><Link to = "https://mern-e-com-idshop.vercel.app/categoryV">Categories</Link></li>
            </>
        )    
    }

    const adminRoute = () =>{
        return (
            <>
                <li><Link to = "https://mern-e-com-idshop.vercel.app/create_prod">Ajout Produit</Link></li>
                <li><Link to = "https://mern-e-com-idshop.vercel.app/category">Categories</Link></li>
            </>
        )    
    }
    

    const clientRoute = () =>{
        return (
            <>
            <li><Link to = "https://mern-e-com-idshop.vercel.app/history">Commande</Link></li>
            <li><Link to = "https://mern-e-com-idshop.vercel.app/" onClick = {logoutClient}>Deconnexion</Link></li>
        </>
        )    
    }

    const toggleMenu = () => setMenu(!menu)

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src = {Menu} alt = "" width = "30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to = '/'>{isAdmin ? 'Admin' : isVender ? 'Vender' : 'ID_Shop'}</Link>
                </h1>
            </div>

            <ul className="link" style={styleMenu}>
                <li><Link to = '/'>{isAdmin ? 'Produits' : 'Produits'}</Link></li>

                    {
                        isVender ? venderRoute () :  ''
                    }

                    {
                        isAdmin ? '' 
                        :isLogin ? ''
                        :isVender ? venderRoute ()
                        :<li><Link to = '/login'>Vendre</Link></li> 
                    } 

                    {isAdmin && adminRoute ()}
                    {
                        isLogin ? clientRoute () :  <li><Link to = '/login'>Inscription @ Connexion</Link></li>
                    }
    
                <li onClick={() => setMenu(!menu)}>
                    <img src = {Close} alt = "" width = '30' className = "menu"></img>
                </li>
            </ul>

            {
                isAdmin ? '' 
                :isVender ? ''
                :<div className="carte">
                    <span>{panier.length}</span>
                    <Link to = '/panier'>
                        <img src = {Carte} alt = "" width = '30' />
                    </Link>
                </div>  
            }   
        </header>
    )
}

export default Header;