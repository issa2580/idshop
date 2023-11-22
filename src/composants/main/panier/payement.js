import React, {useState, useContext} from "react";
import { GlobalState } from "../../../etat";
import axios from "axios";

const initialState = {
    id_client: '',
    name: '',
    email: '',
    adresse: '',
    tel: '',
    total: ''
}


function Payement (){

    const state = useContext(GlobalState);
    const [isLogin] = state.clientAPI.isLogin;
    const [payement, setPayement] = useState(initialState);
    const [panier, setPanier] = state.clientAPI.panier;
    const [calback, setCallback] = state.clientAPI.callback;
    const [token] = state.token;
    const [clbk, setClbk] = state.categoryAPI.clbk;
  


    const handleChangeInput = e =>{
        const {name, value} = e.target;
        setPayement ({...payement, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault ()
        try {
            if (!isLogin){
                alert ("vous n'etes pas un client")
                return;
            } 
            
            const addToPanier = async (panier) =>{
                await axios.patch ('https://mern-e-com-idshop.vercel.app/client/addpanier', {panier}, {
                    headers: {Authorization: token}
                })
            }               

            await axios.post ('https://mern-e-com-idshop.vercel.app/api/payement', {...payement}, {
                headers: {Authorization: token}
            })
                    setPanier ([])
                    addToPanier ([])
                    setCallback(!calback)
                    alert ('commande effectuée avec succes');

            setPayement (initialState);
            setClbk(!clbk);
            
        } catch (error) {
            alert (error.response.data.msg)
        }
    }


    return (
        <div className="payement">

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <label htmlFor="adresse">Adresse</label>
                    <input type="text" name="adresse" id="adresse" required value={payement.adresse} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="adresse">Tel</label>
                    <input type="Number" name="tel" id="tel" required value={payement.tel} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="panier">ID Produit</label>
                    <input type="text" name="panier" id="panier" required value={payement.panier} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="total">Prix Total</label>
                    <input type="number" name="total" id="total" required value={payement.total} onChange={handleChangeInput} />
                </div>

                <button type="submit">Payer</button>
            </form>
            
        </div>
    )
}



export default Payement;