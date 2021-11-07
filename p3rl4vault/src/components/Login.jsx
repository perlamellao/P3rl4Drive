import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import './Login.css'
import Popup from './Popup'

async function loginUser(credentials) {
    const res = await axios.post(`http://localhost:8080/login`, {credentials})
    return res.data
}

function Login({ setUser, error}) {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    let pop = ''
    const errorUsr = "EL USUARIO NO EXISTE"
    const closedSes = "SE HA CERRADO SU SESION"
    const handleSubmit = async e => {
        e.preventDefault()
        const user = await loginUser({
          username,
          password
        })
        console.log(user)
        setUser(user)
    }
    console.log(error)
    if (error === 1) {
        pop = <Popup message={errorUsr}/>
    }else if (error === 2) {
        pop = <Popup message={closedSes}/>
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
                            <a className="forgot text-muted" href="/#">No tienes Cuenta Todavia?</a>
                            <input type="submit" defaultValue="Login" href="/lel" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login
