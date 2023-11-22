
import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../etat";


function DetailCommande(){
    
    const state = useContext(GlobalState);
    const [history] = state.clientAPI.history;
    const [detail, setDetail] = useState([]);
    
    const params = useParams();

    useEffect(() =>{
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setDetail(item)
            })
        }
    }, [params.id, history])

    console.log(detail);
    if(detail.length === 0) return null;

    return(
        <div className="historique">
            <h2>Historique des commandes</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Telephone</th>
                            <th>Panier</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                    <td>{detail.name}</td>
                                    <td>{detail.email}</td>
                                    <td>{detail.adresse}</td>
                                    <td>{detail.tel}</td>
                                    <td>{detail.panier}</td>
                                    <td>{detail.total}</td>
                                    
                                </tr>
                            
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}


export default DetailCommande;

