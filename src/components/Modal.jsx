import React, { useState } from "react";
import '../scss/modal.scss';

function Modal({ width, height, likes, date, description, closeModal }) {
    const[edit, setEdit] = useState(description)
    

    return (
        <div className="modalcontainer">
            <dialog className="modal" open>
                <ul>
                    <li>Propiedades de la img</li>
                    <li>WIDTH: {width}</li>
                    <li>HEIGHT: {height}</li>
                    <li>LIKES: {likes}</li>
                    <li>DATE: {date}</li>
                    <li className="desc">DESCRIPTION:</li>
                </ul>
                
                <textarea type="text" value={description} />
                <button className="close" onClick={closeModal}>Cerrar</button>
            </dialog>
        </div>
    );
}

export default Modal;