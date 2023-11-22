import React, {useContext, useState, useEffect} from "react";
import {GlobalState} from "../../../etat";
import {Link} from 'react-router-dom';
import axios from "axios";


function Panier (){
    const state = useContext(GlobalState);
    const [panier, setPanier] = state.clientAPI.panier;
    const [calback, setCallback] = state.clientAPI.callback;
    const [token] = state.token;
    const [total, setTotal] = useState (0);

    useEffect (() =>{
        const getTotal = () =>{
            const total = panier.reduce ((prev, item) =>{
                return prev + (item.prix * item.qte);
            },0)

            setTotal (total);
        }

        getTotal ();
    },[panier])

    const addToPanier = async (panier) =>{
        await axios.patch ('https://mern-e-com-idshop.vercel.app/client/addpanier', {panier}, {
            headers: {Authorization: token}
        })
    }

    const SupProduit = id =>{
        if(window.confirm ('voulez-vous le suprrimer du panier')){
            panier.forEach((item, index) => {
                if (item._id === id){
                    panier.splice (index, 1)
                }
            })

            setPanier ([...panier])
            addToPanier (panier)
        }
    }

  
    const paysucces = async (payement) =>{
            console.log (payement)
            const {payementID, adresse, tel} = payement;
            const result = await axios.post ('https://mern-e-com-idshop.vercel.app/api/payement', {panier, payementID, adresse, tel}, {
                headers: {Authorization: token}
            })
            console.log(result);
            setPanier ([])
            addToPanier ([])
            setCallback(!calback)
            alert ('commande effectuée avec succes');
        }

    if (panier.length === 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem", color: "#ff0044"}}>Panier Vide</h2>  
    

    return (
        <div>
            {
                panier.map(prod =>(
                    <div className="detail panier" key = {prod._id}>
                        <img src = {prod.images.url} alt = "" />
        
                        <div className="box-detail">
                            <h2>{prod.libelle}</h2>
                            <h3># {prod.produit_id}</h3>
                            <h3>{prod.prix} FCFA</h3>
                            <p>{prod.description}</p>
                            <p>{prod.contenu}</p>
                            <div className="sup" onClick={() => SupProduit(prod._id)}>X</div>
                        </div>
                    </div>
                ))
            } 
            <div className="payement">
                <h3>Total: {total} FCFA</h3>
                <Link to = '/payement'>Payement</Link>                
            </div>        
        </div>
    )
}

export default Panier;