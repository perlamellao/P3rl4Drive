import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Files.css'
import { read_cookie } from 'sfcookies'


function Files() {
    const [cards, setCards] = useState(null)
    const id = read_cookie('session_id')

    useEffect(() => {
        axios.post(`http://127.0.0.1:8020/files`, {id}).then(
            (response) => {
                setCards(response.data)
            }
        )
    }, [id])
    if (cards === null) {
        return (
            <div className="spinner-border text-success spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://127.0.0.1:8020/files/upload';

        const fileInput = document.querySelector('#formFile');
        var reader = new FileReader();
        const file = fileInput.files[0];
        reader.readAsDataURL(file);
        reader.onload = function () {
            axios.post(url, {"filename":file.name,"b64":reader.result, id}).then(
                (response) => {
                    console.log(response)
                }
            )
        };
    }
    return (
        <div className="file">
            <div className="modal-button">
                <div>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#upload">
                        Subir archivos
                    </button>
                </div>
                
                <div className="modal fade" id="upload" tabIndex={-1} aria-labelledby="popup" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="popup">Subir Archivos</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Elige el Archivo a subir</label>
                                        <input className="form-control" type="file" id="formFile"/>
                                        <div className="form-button-div">
                                            <button type="submit" className="form-button btn btn-success">
                                                Aceptar
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-3 card-div">
                {
                    cards.map(name =>
                        <div className="col">
                            <div className="card cardS">
                                <h5 className="card-title text-center">{name}</h5>
                                <a href="" className="text-center"><i className='bx bx-download dbutton'></i></a>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}



export default Files
