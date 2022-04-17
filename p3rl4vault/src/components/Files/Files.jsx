import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Files.css'
import { read_cookie } from 'sfcookies'


function Files() {
    const [cards, setCards] = useState(null)
    const [search, setSearch] = useState("")
    const id = read_cookie('session_id')
    const[percent, setPercent] = useState('0%');
    useEffect(() => {
        axios.post(`https://driveback.p3rl4.me/files`, {id, search}).then(
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
    function handleSearch(e) {
        setSearch(e.target.archivo.value)
        axios.post(`https://driveback.p3rl4.me/files`, {id, search}).then(
            (response) => {
                setCards(response.data)
            }
        )
        e.preventDefault()
    }
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://driveback.p3rl4.me/files/upload/' + id;
        const fileInput = document.querySelector('#formFile');
        const formData = new FormData();
        for (let index = 0; index < fileInput.files.length; index++) {
            formData.append('file', fileInput.files[index]);
        }
        
        for (var p of formData) {
            console.log(p);
        }

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                const percentCompleted = Math.round((progressEvent.loaded * 100) / totalLength);
                setPercent(percentCompleted + '%')
            }
        }).then(response => { 
            document.getElementById('upload').style.display = 'none';
            document.getElementById('upload').style.pointerEvents = 'none'
            window.location.reload(false)
        }).catch(error => {
            console.log(error)
        })
        
    }
    return (
        <div className="file d-flex justify-content-center col">
            <div className="">
                <div className="row modal-button">
                    <form id="search-file" className="my-2 col d-flex search" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" name="archivo" placeholder="Archivo" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <button type="button" className="col btn btn-success" data-bs-toggle="modal" data-bs-target="#upload" data-bs-backdrop="false">
                        Subir archivos
                    </button>
                </div>
                
                <div className="modal notShow" id="upload" tabIndex={-1} aria-labelledby="popup">
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
                                        <input className="form-control" multiple type="file" id="formFile"/>
                                        <div className="progress" id="upload-status">
                                            <div id="progress-bar" className="progress-bar progress-bar-striped" style={{width:percent}}>{percent}</div>
                                        </div>
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

            <div className="row card-div d-flex justify-content-center">
                {
                    cards.map(name =>{
                        return name.toLowerCase().endsWith(".png") || name.toLowerCase().endsWith(".gif")|| name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".jpeg") || name.toLowerCase().endsWith(".webp") ?
                        <div className="col cardS-div text center">
                            <div className="card cardS">
                                <a className="row" href={"https://driveback.p3rl4.me/delfile/"+id+"/"+name} target="_blank" rel="noreferrer noopener"><i className='bx bxs-trash eliminar'></i></a>
                                <img className="imge row" alt={name} src={"https://driveback.p3rl4.me/getfile/"+id+"/"+name}/>
                                <p>{name}</p>
                                <a href="/#" onClick={() => {window.open("https://driveback.p3rl4.me/getfile/"+id+"/"+name,'_blank'); window.location.reload(false)}} className="text-center dwnload-button row" rel="noreferrer noopener"><i className='bx bx-download dbutton'></i></a>
                            </div>
                        </div>
                        :
                        <div className="col cardS-div">
                            <div className="card cardS">
                                <a className="row" href={"https://driveback.p3rl4.me/delfile/"+id+"/"+name} target="_blank" rel="noreferrer noopener"><i className='bx bxs-trash eliminar'></i></a>
                                <h5 className="card-title text-center row filename">{name}</h5>
                                <a href="/#" className="text-center dwnload-button row" onClick={() => {window.open("http://driveback.p3rl4.me/getfile/"+id+"/"+name,'_blank')}} rel="noreferrer noopener"><i className='bx bx-download dbutton'></i></a>
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
    )
}



export default Files
