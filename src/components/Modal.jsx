import React, { useEffect, useState } from "react";
import '../scss/modal.scss';
import { useLocation } from "react-router-dom";

function Modal({ width, height, likes, date, description, closeModal, save }) {
    const [edit, setEdit] = useState(description)
    const location = useLocation();
    const formatDate = new Date(date).toLocaleDateString()

    const handleSave = () => {
        save(edit);           
        closeModal();         
    };                        
 
    useEffect(() => {
    }, [location])
    
    return (
        <div className="modalcontainer">
            <dialog className="modal" open>
                <ul>
                    <li>WIDTH: {width}</li>
                    <li>HEIGHT: {height}</li>
                    <li>LIKES: {likes}</li>
                    <li>DATE: {formatDate}</li>
                    <li className="desc">DESCRIPTION:</li>
                </ul>

                <textarea
                    type="text"
                    value={edit}
                    onChange={e => setEdit(e.target.value)}
                />
                {location.pathname === '/galery' ? null : <button className="save" onClick={handleSave}>Save</button>}                
                <button className="close" onClick={closeModal}>Cerrar</button>
            </dialog>
        </div>
    );
}

export default Modal;