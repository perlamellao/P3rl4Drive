import React, { useState } from 'react'
import axios from 'axios'
import { bake_cookie, delete_cookie } from 'sfcookies'
import './Login.css'
import Popup from '../Popup/Popup'

async function loginUser(credentials) {
    const res = await axios.post(`https://driveback.p3rl4.me/login`, {credentials})
    
    return res.data
}

function Login({error}) {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    let pop = ''
    const errorUsr = "EL USUARIO NO EXISTE"
    const closedSes = "SE HA CERRADO SU SESIÓN"
    const handleSubmit = async e => {
        e.preventDefault()
        const user = await loginUser({
          username,
          password
        })
        delete_cookie("username")
        delete_cookie("session_id")
        bake_cookie("username",username.toLowerCase())
        bake_cookie("session_id",user)
        window.location.reload(false)
        
    }
    if (error === 1) {
        pop = <Popup message={errorUsr}/>
    }else if (error === 2) {
        pop = <Popup message={closedSes}/>
    }
    const singUp = () => {
        bake_cookie("session_id","SINGUP")
        window.location.reload(false)
    }

    return (
        <div>
            <div className="container">
                {pop}
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                        <form onSubmit={handleSubmit} className="box">
                            <img src="LOGO.png" className="logo" alt="lesgoo" />
                            <p className="text-muted"> Introduce tu usuario y contraseña</p>
                            <input type="text" placeholder="Usuario" onChange={e => setUserName(e.target.value)} />
                            <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                            <a className="forgot text-muted" href="/#" onClick={singUp}>¿No tienes cuenta todavía?</a>
                            <input type="submit" defaultValue="Login" href="/#" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>

        
        </div>
    )
}

export default Login
