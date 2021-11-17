import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Files.css'
import { read_cookie } from 'sfcookies'







function Files() {
    const [cards, setCards] = useState(null)
    const id = read_cookie('session_id')

    useEffect(() => {
        axios.post(`http://localhost:8080/files`, {id}).then(
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
    return (
        
        <div className="file">
            <div class="dropdown dropbutton">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Ordenar Por
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Fecha</a></li>
                    <li><a class="dropdown-item" href="#">Nombre</a></li>
                    <li><a class="dropdown-item" href="#">Tupuv2</a></li>
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
