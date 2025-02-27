import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery } from "../redux/GalerySlice";
import { addFavourite, deleteFavourite } from "../redux/favouriteSlice";
import Masonry from "react-masonry-css";
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg'
import downloadIcon from '../assets/download.svg';
import Modal from "./modal";
import Select from "./Select";


const Galery = () => {
   const dispatch = useDispatch();
   //galeria de img random
   const { images, loading, error } = useSelector((state) => state.galery);
   const [open, setopen] = useState(null);//para el modal
   const [order, setOrder] = useState(''); //para el select

   //favoritos
   const favourites = useSelector((state) => state.favourites.fav);
   console.log("Favoritos en Galería:", favourites);

   useEffect(() => {
      if (loading === false) {

         dispatch(imgGalery());
      }
   }, [dispatch]);


   const openPopup = (selectImg) => {
      setopen(selectImg);
   };

   const closePopup = () => {
      setopen(false);
   };

   // const handleDescription = (newDesc) =>{
   //    const saveDescription = JSON.parse(localStorage.getItem('description')) || {};
   //    saveDescription[images.alt_description] = newDesc
   //    localStorage.setItem("description", JSON.stringify(saveDescription));
   // }

   const handleFavourite = (img) => {
      if (favourites.some((fav) => fav.id === img.id)) {
         dispatch(deleteFavourite(img.id));
      } else {
         dispatch(addFavourite(img));
      }
   };

   //funcion para ordenar las imagenes
   const orderImages = [...images].sort((a, b) => {
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

   const openImg = (imageUrl) => {
      window.open(imageUrl, '_blank');
   };


   const colums = {
      default: 4, 
      1200: 3,   
      700: 2,   
      500: 1     
   };

   return (
      <div>
         <Select setOrder={setOrder} />
         <Masonry
            breakpointCols={colums}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
         >
            {orderImages.map((img) => (
               <div className="gallery__container" key={img.id}>
                  <img src={img.urls.small} alt={img.alt_description} />
                  <div className="gallery__options">
                     <button className="save-btn" onClick={() => handleFavourite(img)}>
                        <img src={favourites.some((fav) => fav.id === img.id) ? heartLikeIcon : heartIcon} alt="icono de un lapiz" />
                     </button>{/* favourite */}

                     <button className="open" onClick={() => openPopup(img)}>
                        <img src={pencilIcon} alt="icono de un corazon vacio" />
                     </button>{/* open popup */}

                     <button className="download-btn" onClick={() => openImg(img.urls.full)}><img src={downloadIcon} alt="icono de descargar" /></button>{/* download */}
                  </div>
               </div>
            ))}
         </Masonry>

         {open && (
            <Modal
               width={open.width}
               height={open.height}
               likes={open.likes}
               date={open.created_at}
               description={open.alt_description}
               closeModal={closePopup}
            // saveDes={handleDescription(open.alt_description)}
            />
         )}
      </div>
   )
};

export default Galery;