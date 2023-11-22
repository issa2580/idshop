import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import { GlobalState } from "../../../etat";
import {useParams} from 'react-router-dom';


const initialState = {
    produit_id: '',
    libelle: '',
    prix: '',
    description: 'Hello world',
    contenu: 'Hello react',
    category: '',
    _id: ''
}


function AddProduitV (){
    const state = useContext(GlobalState);
    const [prod, setProd] = useState(initialState);
    const [category] = state.categoryAPI.category;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVender] = state.clientAPI.isVender;
    const [token] = state.token;
    const [produit] = state.productsAPI.produit;
    const [modif, setModif] = useState(false);
    const [clbk, setClbk] = state.productsAPI.clbk



    const param = useParams ();

    useEffect (() =>{
        if (param.id){
            setModif(true);
            produit.forEach(prod =>{
                if (prod._id === param.id){
                    setProd (prod)
                    setImages (prod.images)
                }
            })
        } else{
            setModif(false);
            setProd(initialState);
            setImages(false);
        }
    }, [param.id, produit])



    const handlerUpload = async e =>{
        e.preventDefault ()
        try {
            if (!isVender) return alert ("Acces non autorisé");
            const file = e.target.files[0];
            
            if (!file) return alert ('fichier inexistant');

            if(file.size > 1024 * 1024)
            return alert ('fichier volumineux');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
            return alert ('format non prise en charge');

            let fichier = new FormData()
            fichier.append ('file', file)

            setLoading (true);
            const result = await axios.post ('https://mern-e-com-idshop.vercel.app/api/upload', fichier, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading (false);
            setImages (result.data);

        } catch (error) {
            alert (error.response.data.msg)
        }
    }

    const handleSup = async () =>{
        try {
            if (!isVender) return alert ("Acces non autorisé");
            setLoading (true);

            await axios.post ('https://mern-e-com-idshop.vercel.app/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })

            setLoading (true);
            setImages(false)

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target;
        setProd ({...prod, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault ()
        try {
            if (!isVender){
                alert ("Acces non autorisé")
                return;
            } 
            if (!images){
                alert ("Aucune image chargé")
                return;
            }
            
            if(modif){
                 await axios.put (`https://mern-e-com-idshop.vercel.app/api/produit/${prod._id}`, {...prod, images}, {
                    headers: {Authorization: token}
                })
            } else{
                 await axios.post ('https://mern-e-com-idshop.vercel.app/api/produit', {...prod, images}, {
                    headers: {Authorization: token}
                })
            }
                       
            setImages (false);
            setProd (initialState);
            setClbk(!clbk);
            
        } catch (error) {
            alert (error.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="addProduit">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handlerUpload} />
                {
                    loading ? <div id="file_img"></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleSup}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="produit_id">ID Produit</label>
                    <input type="text" name="produit_id" id="produit_id" required value={prod.produit_id} onChange={handleChangeInput} disabled={prod._id} />
                </div>

                <div className="row">
                    <label htmlFor="libelle">Libelle</label>
                    <input type="text" name="libelle" id="libelle" required value={prod.libelle} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="prix">Prix</label>
                    <input type="number" name="prix" id="prix" required value={prod.prix} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required value={prod.description}  rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="contenu">Contenu</label>
                    <textarea type="text" name="contenu" id="contenu" required value={prod.contenu} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={prod.categorie} onChange={handleChangeInput}>
                        <option value="">Selectionner le category</option>
                            {
                                category.map (categorie =>(
                                    <option value={categorie._id} key={categorie._id}>
                                        {categorie.name}
                                    </option>
                                ))    
                            }
                    </select>
                </div>
                <button type="submit">{modif? "Modif" : "Ajout"}</button>
            </form>
            
        </div>
    )
}

export default AddProduitV;