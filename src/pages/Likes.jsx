import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourite } from "../redux/favouriteSlice";
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg'
import downloadIcon from '../assets/download.svg';
import Modal from "../components/modal";
import Select from "../components/Select";

const Likes = () => {
   const dispatch = useDispatch();
   const favourites = useSelector((state) => state.favourites.fav);
   const [open, setopen] = useState(null);
   const [order, setOrder] = useState(''); //para el select

   const handleDelete = (img) => {
      dispatch(deleteFavourite(img.id))
   }

   const openPopup = (selectImg) => {
      setopen(selectImg);
   };

   const closePopup = () => {
      setopen(false);
   };

   //funcion para ordenar las imagenes
   const orderImages = [...favourites].sort((a, b) => {
      if (order === "likes") {
         return b.likes - a.likes;
      } else if (order === "height") {
         return b.height - a.height;
      } else if (order === "width") {
         return b.width - a.width;
      } else if (order === "created_at") {
         return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
   });


   return (
      <div>
         <Select setOrder={setOrder} />
         <div className="gallery">
            {favourites.length === 0 ? <h2>No tienes ninguna imagen guardada</h2> :
               orderImages.map((img) => (
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
                  description={open.alt_description}
                  closeModal={closePopup}
               />
            )}
         </div>
      </div>
   );

}
export default Likes;