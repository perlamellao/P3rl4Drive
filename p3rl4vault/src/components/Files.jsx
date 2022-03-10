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
                //convert response from an objext to an array
                let arr = []
                for (let key in response.data) {
                    arr.push(response.data[key])
                }
                setCards(arr)
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
    const sortNames = (arr) => {
        arr.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        setCards(arr)
    
    }
    console.log(cards)
    return (
        <div className="file">
            <div>
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
                                <form action="/upload">
                                    <div className="mb-3">
                                        <label for="formFile" class="form-label">Elige el Archivo a subir</label>
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
            <div className="dropdown dropbutton">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Ordenar Por
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="/files/#" >Fecha</a></li>
                    <li><a className="dropdown-item" href="/files/#" onClick={sortNames.bind(this, cards)}>Nombre</a></li>
                </ul>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-3">
                {
                    cards.map(name =>
                        <div className="col">
                            <div className="card cardS">
                                <h5 className="card-title text-center">{name}</h5>
                                <a href="/files/#" className="text-center"><i className='bx bx-download dbutton'></i></a>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}



export default Files
