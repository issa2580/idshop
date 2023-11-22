import React, {useState, useContext} from "react";
import { GlobalState } from "../../../etat";
import axios from "axios";
import Update from './update.svg';
import Delete from './delete.svg';


function Category (){

    const state = useContext(GlobalState);
    const [category, setCategory] = state.categoryAPI.category;
    const [categorie, setCategorie] = useState('');
    const [token] = state.token;
    const [clbk, setClbk] = state.categoryAPI.clbk;
    const [modif, setModif] = useState (false);
    const [id, setId] = useState ('');

    const ajoutCategory = async e =>{
        try {
            if (modif){
                const result = await axios.put (`https://mern-e-com-idshop.vercel.app/api/category/${id}`, {name: categorie}, {
                    headers: {Authorization: token}
                })
                alert (result.data.msg);
            } else{
                const result = await axios.post ('https://mern-e-com-idshop.vercel.app/api/category', {name: categorie}, {
                    headers: {Authorization: token}
                })
                alert (result.data.msg);
            }

            setModif(false);
            setCategorie ('');
            setClbk (!clbk);
            
        } catch (error) {
            alert (error.response.data.msg);
        }
    }

    const modifCategory = async (id, name) =>{
        setId(id)
        setCategorie(name)
        setModif(true)
    }

    const supCategory = async id =>{
        try {
            const result = await axios.delete (`https://mern-e-com-idshop.vercel.app/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert (result.data.msg);
            setClbk(!clbk);
        } catch (error) {
            alert (error.response.data.msg);
        }
    }

    return(
        <div className="categorie">
            <form onSubmit={ajoutCategory}>
                <label htmlFor="category">Categorie</label>
                <input type="text" name="category" value={categorie} required onChange={e => setCategorie(e.target.value)} />

                <button type="submit">{modif ? "Modif" : "Ajout"}</button>
            </form>

            <div className="col">
                {
                    category.map(categorie =>(
                        <div className="row" key={categorie._id}>
                            <p>{categorie.name}</p>

                            <div>
                                <button id="modif" onClick={() => modifCategory(categorie._id, categorie.name)}><img src = {Update} alt = "" width = '30' height = '30' /></button>
                                <button id="sup" onClick={() => supCategory(categorie._id)}><img src = {Delete} alt = "" width = '30' height = '30' /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}



export default Category;