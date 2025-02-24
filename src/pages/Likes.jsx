import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourite } from "../redux/favouriteSlice";
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg'
import downloadIcon from '../assets/download.svg';
import Modal from "../components/modal";

const Likes = () => {
   const dispatch = useDispatch();
   const favourites = useSelector((state) => state.favourites.fav);
   const [open, setopen] = useState(null);
   

   const handleDelete = (img) =>{
      dispatch(deleteFavourite(img.id))
   }

   const openPopup = (selectImg) => {
      setopen(selectImg);
   };

   const closePopup = () => {
      setopen(false);
   };

   return (
      <div className="gallery">
         { favourites.length === 0 ? <h2>No tienes ninguna imagen guardada</h2> :
         favourites.map((img) => (
            <div className="gallery__container" key={img.id}>
               <img src={img.urls.small} alt={img.alt_description} />
               <div className="gallery__options">
                  <button className="save-btn" onClick={() => handleDelete(img)}>
                     <img src={favourites.some((fav) => fav.id === img.id) ? heartLikeIcon : heartIcon} alt="icono de un lapiz" />
                  </button>{/* favourite */}

                  <button className="open" onClick={() => openPopup(img)}>
                     <img src={pencilIcon} alt="icono de un corazon vacio" />
                  </button>{/* open popup */}

                  <button className="save-btn"><img src={downloadIcon} alt="icono de descargar" /></button>{/* download */}
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

}
export default Likes;