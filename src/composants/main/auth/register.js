import React, {useState} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';


function Register (){

    const [client, setClient] = useState ({
        name:'', email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setClient ({...client, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault ()
        try {
            await axios.post ('https://mern-e-com-idshop.vercel.app/client/register', {...client})

            localStorage.setItem ('firstRegister', true)

            window.location.href = "/";
        } catch (error) {
            alert (error.response.data.msg)
        }
    }

    return (
        <div className="register">
            <form onSubmit={registerSubmit}>
                <h1>Register</h1>

                <input type="text" name="name" required placeholder="Name" value={client.name} onChange={onChangeInput} />

                <input type="email" name="email" required placeholder="Email" value={client.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on" placeholder="Password" value={client.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Inscrire</button>
                    <Link to = "/login">Connecter</Link>
                </div>

            </form>
        </div>
    )
}

export default Register;