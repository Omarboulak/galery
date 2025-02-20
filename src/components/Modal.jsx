import React from "react";
import '../scss/modal.scss'

function Modal({width, height, likes, date, description}){

    return(
        <dialog className="modal">
            <ul>
                <li>Propiedades de la img</li>
                <li>WIDTH: {width}</li>
                <li>HEIGHT: {height}</li>
                <li>LIKES: {likes}</li>
                <li>DATE: {date}</li>
                <li>DESCRIPTION: {description}</li>
            </ul>

            <button className="close"><img src="" alt="" /></button>
        </dialog>
    )
}

export default Modal;