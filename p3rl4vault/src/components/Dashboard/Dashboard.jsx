import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { read_cookie } from 'sfcookies'

import 'chart.js/auto';
import { Doughnut} from 'react-chartjs-2';

import './Dashboard.css'


function Dashboard({ message }) {
    const [fileTotal, setFiletotal] = useState()
    const [fileTotalSize, setFileTotalSize] = useState()
    const [fileTypes, setFileTypes] = useState()
    const [fileTotalUploaded, setFileTotalUploaded] = useState(0)
    const id = read_cookie('session_id')
    useEffect(() => {
        axios.post(`http://www.p3rl4.me:8020/files/gettotal`, {id}).then(
            (response) => {
                var files=0
                setFiletotal(response.data[0])
                setFileTypes(response.data[1])
                setFileTotalSize(response.data[2])
                for(let i = 0; i < response.data[0].length; i++){
                    files += response.data[0][i]
                }
                setFileTotalUploaded(files)
            }
        )
    }, [id])
    
    if (fileTotal === undefined) {
        return (
            <div className="spinner-border text-success spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    const data = {
        labels: fileTypes,
        datasets: [{
            data: fileTotal,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#00FF00',
            '#FF00FF',
            ],
            hoverBackgroundColor: [
            '#B5475F',
            '#246D9E',
            '#CC9F2F',
            '#00AA00',
            '#AA00AA',
            ]
        }],
    };
    
    return (
        <div className="container container-dashboard d-flex justify-content-md-center text-center">
            <div className="row text-center">
                <div className="col-md-6">
                    <div className="card card-style">
                        <h2>Total archivos</h2>
                        <Doughnut data={data} />                  
                        <div className="donut-inner">
                            <h5>{fileTotalSize}/100GB</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card card-style">
                        <h2>Archivos subidos</h2>
                        <div className="archivos-sub">
                            <h2>{fileTotalUploaded}</h2>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default Dashboard
