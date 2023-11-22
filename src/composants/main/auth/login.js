import React, {useState} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';


function Login (){

    const [client, setClient] = useState ({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setClient ({...client, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault ()
        try {
            await axios.post ('https://mern-e-com-idshop.vercel.app/client/login', {...client})

            localStorage.setItem ('firstLogin', true)

            window.location.href = "/";
        } catch (error) {
            alert (error.response.data.msg)
        }
    }

    return (
        <div className="login">
            <form id="form" onSubmit={loginSubmit}>
                <h1>Login</h1>
                <input type="email" name="email" required placeholder="Email" value={client.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on" placeholder="Password" value={client.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit" id="submitButton">Connecter</button>
                    <Link to = "/register">Inscrire</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;