import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery, imgSearch } from "../redux/GalerySlice";
import { saveAs } from "file-saver";
import { addFavourite, deleteFavourite } from "../redux/favouriteSlice";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg'
import downloadIcon from '../assets/download.svg';
import Modal from "./modal";
import Select from "./Select";

const Galery = ({ search }) => {
   const dispatch = useDispatch();
   const { images, loading, error } = useSelector((state) => state.galery);
   const favourites = useSelector((state) => state.favourites.fav);
   const [open, setopen] = useState(null);//para el modal
   const [order, setOrder] = useState('');//para el select
   const [pages, setPages] = useState(1);//para el scroll infinito


   useEffect(() => {
      if (search !== '') {
         dispatch(imgSearch({ query: search, page: pages }));
      } else {
         dispatch(imgGalery(pages));
      }
   }, [pages, dispatch, search]);

   // Cargar más imágenes
   const handlePagination = () => {
      const nextPage = pages + 1;
      setPages(nextPage);
   };

   const openPopup = (selectImg) => {
      setopen(selectImg);
   };

   const closePopup = () => {
      setopen(false);
   };

   const handleFavourite = (img) => {
      if (favourites.some((fav) => fav.id === img.id)) {
         dispatch(deleteFavourite(img.id));
      } else {
         dispatch(addFavourite(img));
      }
   };

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

   const downloadImage = (imageUrl, imageName) => {
      saveAs(imageUrl, imageName || "unsplash-image.jpg");
   };

   const colums = {
      default: 4,
      1200: 3,
      700: 2,
      500: 1
   };

   return (
      <div className="container">
         <Select setOrder={setOrder} />
         <InfiniteScroll
            dataLength={images.length}
            next={handlePagination}
            hasMore={true}
            loader={<h4>Loading...</h4>}
         >
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
                        </button>
                        <button className="open" onClick={() => openPopup(img)}>
                           <img src={pencilIcon} alt="icono de un corazon vacio" />
                        </button>
                        <button className="download-btn" onClick={() => downloadImage(img.urls.full, `unsplash-${img.id}.jpg`)}><img src={downloadIcon} alt="icono de descargar" /></button>
                     </div>
                  </div>
               ))}
            </Masonry>
         </InfiniteScroll>


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
   );
};

export default Galery;