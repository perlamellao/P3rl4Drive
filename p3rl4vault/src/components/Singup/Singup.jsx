import React, { useState } from 'react'
import './Singup.css'
import axios from 'axios'
import { delete_cookie, bake_cookie } from 'sfcookies'


async function singUpUser(credentials) {
    const res = await axios.post(`https://driveback.p3rl4.me/singup`, {credentials})
    
    return res.data
}


function Singup() {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            alert("Las contraseñas no coinciden")
            return
        }
        const user = await singUpUser({
          username,
          password
        })
        console.log(user)
        delete_cookie('session_id')
        bake_cookie("session_id",user)
        window.location.reload(false)
    }
    const cancelSingup = e => {
        e.preventDefault()
        delete_cookie('session_id')
        window.location.reload(false)
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                        <form onSubmit={handleSubmit} className="box">
                            <img src="LOGO.png" className="logo" alt="lesgoo" />
                            <p className="text-muted"> Introduce tu usuario y contraseña</p>
                            <input type="text" placeholder="Usuario" onChange={e => setUserName(e.target.value)} />
                            <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                            <input type="password" placeholder="Repite Contraseña" onChange={e => setPassword2(e.target.value)} />
                            <div className="row">
                                <button type="button" onClick={cancelSingup} className="col btn btn-danger exitbutton">Salir</button>
                                <input className="col m-2" type="submit" defaultValue="Login" href="/#" />
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup