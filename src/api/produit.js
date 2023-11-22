import {useState, useEffect} from 'react';
import axios from 'axios';

function ProduitsAPI(){
    const [produit, setProduit] = useState([]);
    const [clbk, setClbk] = useState(false);
    const [category, setCategory] = useState('');
    const [payement, setPayement] = useState('');
    const [sort, setSort] = useState('');
    const [rech, setRech] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    

    useEffect (() =>{
        const fetchProduit = async () =>{
            const res = await axios.get (`https://mern-e-com-idshop.vercel.app/api/produit?${category}&${sort}&$limit=${page*9}`);
            console.log(res);
            setProduit(res.data.produit);
            setResult(res.data.result);
        }
        fetchProduit()
    },[clbk, category, payement, sort, rech, page])

    return {
        produit: [produit, setProduit],
        clbk: [clbk, setClbk],
        category: [category, setCategory],
        payement: [payement, setPayement],
        sort: [sort, setSort],
        rech: [rech, setRech],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ProduitsAPI;