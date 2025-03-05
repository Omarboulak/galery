import React, { useState } from "react";
import '../scss/modal.scss';

function Modal({ width, height, likes, date, description, closeModal, save }) {
    const [edit, setEdit] = useState(description)

    const handleSave = () => {
        save(edit);
        closeModal(); 
      };

    return (
        <div className="modalcontainer">
            <dialog className="modal" open>
                <ul>
                    {/* <li>Propiedades de la img</li> */}
                    <li>WIDTH: {width}</li>
                    <li>HEIGHT: {height}</li>
                    <li>LIKES: {likes}</li>
                    <li>DATE: {date}</li>
                    <li className="desc">DESCRIPTION:</li>
                </ul>

                <textarea
                    type="text"
                    value={edit}
                    onChange={e => setEdit(e.target.value)}
                />
                <button className="save" onClick={handleSave}>Save</button>
                <button className="close" onClick={closeModal}>Cerrar</button>
            </dialog>
        </div>
    );
}

export default Modal;