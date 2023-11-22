
import {useState, useEffect} from 'react';
import axios from 'axios';

function ClientAPI (token){
    const [isLogin, setIsLogin] = useState (false);
    const [isAdmin, setIsAdmin] = useState (false);
    const [isVender, setIsVender] = useState (false);
    const [panier, setPanier] = useState ([]);
    const [history, setHistory] = useState ([]);
    const [callback, setCallback] = useState (false);

    useEffect (() =>{
        if (token){
            const getClient = async () =>{
                try {
                        const result = await axios.get ('https://mern-e-com-idshop.vercel.app/client/access', {
                        headers: {Authorization: token}
                    })

                    setIsLogin (true)
                    result.data.role === 2 ? setIsVender (true) : setIsVender (false)
                    setPanier (result.data.panier)

                    setIsLogin (true)
                    result.data.role === 1 ? setIsAdmin (true) : setIsAdmin (false)

                    setPanier (result.data.panier)

                } catch (error) {
                    alert (error.response.data.msg)
                }
            } 
            getClient ();
        }
    },[token])

    useEffect (() =>{
        if (token){
            const getHistory = async () =>{
             
            const result = await axios.get ('https://mern-e-com-idshop.vercel.app/client/history', {
                headers: {Authorization: token}
            })

            setHistory(result.data);
        }
            
        getHistory ();

    }
        
    },[token, callback])

    const addPanier = async (prod) =>{
        if (!isLogin){
            alert ('Vous devez vous connecter svp!');
            return;
        }
        

        const check = panier.every (item =>{
            return item._id !== prod._id
        })

        if (check){
            setPanier ([...panier, {...prod, qte: 1}])
            await axios.patch ('https://mern-e-com-idshop.vercel.app/client/addpanier', {panier: [...panier, {...prod, qte: 1}]}, {
                headers: {Authorization: token}
            })

        } else{
            alert ('Produit ajouté')
        }
    }


    return{
        isLogin: [isLogin, setIsLogin],
        isAdmin: [isAdmin, setIsAdmin],
        isVender: [isVender, setIsVender],
        panier: [panier, setPanier],
        history: [history, setHistory],
        callback: [callback, setCallback],
        addPanier: addPanier
    }
}


export default ClientAPI;