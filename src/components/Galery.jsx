import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery } from "../redux/GalerySlice";
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import downloadIcon from '../assets/download.svg';
import Modal from "./modal";

const Galery = () => {
   const dispatch = useDispatch();
   const { images, loading, error } = useSelector((state) => state.galery);
   const [open, setopen] = useState(null); 

   useEffect(() => {
      dispatch(imgGalery());
   }, [dispatch]);

   const openPopup = (selectImg) => {
      setopen(selectImg); 
   };

   const closePopup = () => {
      setopen(false); 
   };

   return (
      <div className="gallery">
         {images.map((img) => (
            <div className="gallery__container" key={img.id}>
               <img src={img.urls.small} alt={img.alt_description} />
               <div className="gallery__options">
                  <button className="save-btn"><img src={heartIcon} alt="icono de un lapiz" /></button>
                  <button className="save-btn" onClick={() => openPopup(img)}>
                     <img src={pencilIcon} alt="icono de un corazon vacio" />
                  </button>
                  <button className="save-btn"><img src={downloadIcon} alt="icono de descargar" /></button>
               </div>
            </div>
         ))}


         {open && (
            <Modal
               width={open.width}
               height={open.height}
               likes={open.likes}
               date={open.created_at}
               description={open.description}
               closeModal={closePopup}
            />
         )}
      </div>
   );
};

export default Galery;