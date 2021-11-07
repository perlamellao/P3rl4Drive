import React from 'react'
import './Popup.css'

function Popup({ message }) {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div className="msg">
                <i class='bx bxs-error icon'></i>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{message}</span>
            </div>
        </div>
    )
}

export default Popup
