import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../etat";
import View from './view.svg';



function Commande (){

   const state = useContext(GlobalState);
   const [history] = state.clientAPI.history;
   const [isAdmin] = useState('');

    return(
        <>
            <div className="historique">
            <h2>Historique des commandes</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Ref Payement</th>
                            <th>Date Payement</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items._id}</td>
                                    <td>{new Date (items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to = {`https://mern-e-com-idshop.vercel.app/history/${items._id}`}><img src = {View} alt = "" width = '30' height = '30' /></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                        
                </table>
            </div>
            
        </div>
        </>
        
    )
}



export default Commande;