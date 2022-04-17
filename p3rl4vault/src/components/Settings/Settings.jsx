import React from 'react'
import axios from 'axios'
import { read_cookie } from 'sfcookies'
import './Settings.css'

function Settings() {
    const username = read_cookie('username')
    const id = read_cookie('session_id')

    function handleSubmit(event){
        event.preventDefault()
        const url = 'https://driveback.p3rl4.me/setprofpic/' + id;
        const fileInput = document.querySelector('#uploadfile');
        const formData = new FormData();
        for (let index = 0; index < fileInput.files.length; index++) {
            formData.append('file', fileInput.files[index]);
        }

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                const percentCompleted = Math.round((progressEvent.loaded * 100) / totalLength);
                console.log(percentCompleted)
            }
        }).then(response => { 
            window.location.reload(false)
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className=" settings-main d-flex justify-content-center">
            <div className="col mt-5">
                <div className="card card-style row text-center">
                    <h2>{username.toUpperCase()}</h2> 
                    <div className='pic-div'>
                        <img className='profile-pic' src={"https://driveback.p3rl4.me/getprofpic/"+id} alt="" /> 
                    </div>
                    <form onSubmit={handleSubmit} className='form input-group mb-3'>
                        <input type="file" className="form-control" id="uploadfile" accept="image/png, image/gif, image/jpeg"/>
                        <button className="input-group-text" htmlFor="uploadfile" type='submit'>Cambiar foto de perfil</button>
                    </form>       
                </div>
                <div className="card card-style row text-center">
                    <h2>Cambiar Contraseña</h2>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="oldPassword">Contraseña Actual</label>
                            <input type="password" className="form-control" id="oldPassword" placeholder="Contraseña Actual"/>

                            <label htmlFor="newPassword">Nueva Password</label>
                            <input type="password" className="form-control" id="newPassword" placeholder="Contraseña Nueva"/>

                            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar Contraseña"/>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default Settings