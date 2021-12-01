import React, { useState } from 'react'
import './Singup.css'
import axios from 'axios'
import { delete_cookie, bake_cookie } from 'sfcookies'


async function singUpUser(credentials) {
    const res = await axios.post(`http://p3rl4.me:8020/singup`, {credentials})
    
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
                            <input type="submit" defaultValue="Login" href="/#" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup