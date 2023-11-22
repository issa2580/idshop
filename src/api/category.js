import {useState, useEffect} from "react";
import axios from "axios";


function CategoryAPI (){
    const [category, setCategory] = useState ([]);
    const [clbk, setClbk] = useState (false)

    useEffect (() =>{
        const ajoutCategory = async () =>{
            const result = await axios.get ('https://mern-e-com-idshop.vercel.app/api/category');
            setCategory (result.data);
            //console.log(result);
        }

        ajoutCategory ()
    }, [])

    return {
        category: [category, setCategory],
        clbk: [clbk, setClbk]
    }
       
    
}



export default CategoryAPI;