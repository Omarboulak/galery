import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery, imgSearch, resetImages } from "../redux/GalerySlice";
import { saveAs } from "file-saver";
import { addFavourite, deleteFavourite } from "../redux/favouriteSlice";

//librerias 
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

//imagenes
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg';
import downloadIcon from '../assets/download.svg';
import up from '../assets/up.svg'

//componentes
import Modal from "./modal";
import Select from "./Select";


const Galery = ({ search }) => {
   const dispatch = useDispatch();
   const { images, loading, error } = useSelector((state) => state.galery);
   const favourites = useSelector((state) => state.favourites.fav);
   const [open, setOpen] = useState(null); // Modal
   const [order, setOrder] = useState(''); // Select
   const [pages, setPages] = useState(1); // Scroll infinito
   const [reset, setReset] = useState(search);

   //para hacer el reset de las paginas cuando hago una busqueda
   useEffect(() => {
      if (search !== reset) {
         setPages(1);
         dispatch(resetImages());
         if (search !== '') {
            dispatch(imgSearch({ query: search, page: 1 }));
         } else {
            dispatch(imgGalery(1));
         }
         setReset(search);
      }
   }, [search, dispatch, reset]);


   useEffect(() => {
      if (pages >= 1) {
         if (search !== '') {
            dispatch(imgSearch({ query: search, page: pages }));
         } else {
            dispatch(imgGalery(pages));
         }
      }
   }, [pages, dispatch, search]);

   // Cargar más imágenes al hacer scroll
   const handlePagination = () => {
      setPages((prev) => prev + 1);
   };

   const openPopup = (selectImg) => setOpen(selectImg);
   const closePopup = () => setOpen(false);

   const handleFavourite = (img) => {
      if (favourites.some((fav) => fav.id === img.id)) {
         dispatch(deleteFavourite(img.id));
      } else {
         dispatch(addFavourite(img));
      }
   };

   const orderImages = [...images].sort((a, b) => {
      if (order === "likes") return b.likes - a.likes;
      if (order === "height") return b.height - a.height;
      if (order === "width") return b.width - a.width;
      if (order === "created_at") return new Date(b.created_at) - new Date(a.created_at);
      return 0;
   });


   const handleback = () => {
      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      window.scrollTo(0, 0)
      return scrollPercentage
   }

   const downloadImage = (imageUrl, imageName) => {
      saveAs(imageUrl, imageName || "unsplash-image.jpg");
   };

   const colums = {
      default: 4,
      1200: 3,
      768: 2,
      480: 1
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
                        <button className="download-btn" onClick={() => downloadImage(img.urls.full, `unsplash-${img.id}.jpg`)}>
                           <img src={downloadIcon} alt="icono de descargar" />
                        </button>
                     </div>
                  </div>
               ))}
            </Masonry>
            <ScrollToTop
               smooth
               top={20}
               color="white"
               className="backTop"
               style={{ backgroundColor: "black", borderRadius: "50%" }}
            />

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
