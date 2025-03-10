import React, { useEffect, useState } from "react";
import '../scss/modal.scss';
import { useLocation } from "react-router-dom";

function Modal({ width, height, likes, date, description, closeModal, save }) {
    const [edit, setEdit] = useState(description)
    const location = useLocation();
    console.log(location.pathname);

    const handleSave = () => {
        save(edit);
        closeModal();
    };
    useEffect(() => {
        console.log(' se esta actualizando');
    }, [location])
    
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
                {location.pathname === '/galery' ? null : <button className="save" onClick={handleSave}>Save</button>}
                {console.log(location)}
                
                <button className="close" onClick={closeModal}>Cerrar</button>
            </dialog>
        </div>
    );
}

export default Modal;