import React from "react";
import ProdRender from "./prodRender";
import axios from "axios";


function ProduitItems ({prod, setProduits, token, clbk, setClbk}){
   

    const supProduit = async() =>{
        try {
            const destroyImg = axios.post('/api/destroy', {public_id: prod.images.public_id}, {
                headers: {Authorization: token}
            })

            const deleteProduit = axios.delete(`/api/produit/${prod._id}`, {
                headers: {Authorization: token}
            })
            console.log(deleteProduit);
            await destroyImg
            await deleteProduit
            setClbk(!clbk)

        } catch (error) {
            alert (error.response.data.msg)
        }
    }

    const handleCheck = () =>{
        prod.checked = !prod.checked;
        setProduits(prod);
    }
    return (
        <div className="prod-card">
          
          <figure className="image">
                <img className="a-img" src={prod.images ? prod.images.url : ''} alt="tst" />
                <figcaption>
                    <h3>{prod.libelle}</h3>
                </figcaption>
            </figure> 

            <div className="prod-box">
                <h2 libelle = {prod.libelle}>{prod.libelle}</h2>
                <span>{prod.prix} FCFA</span>
            </div>

            <ProdRender prod={prod} supProduit={supProduit} />
            
        </div>
    )
}

export default ProduitItems;