import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery, imgSearch, resetImages } from "../redux/GalerySlice";

//librerias 
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

//componentes
import Modal from "./Modal";
import Select from "./Select";
import Images from "./Images";

const Galery = ({ search }) => {
   const dispatch = useDispatch();
   const { images, loading, error } = useSelector((state) => state.galery);
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

   const closePopup = () => setOpen(false);

   const orderImages = [...images].sort((a, b) => {
      if (order === "likes") {
         return b.likes - a.likes;
      }
      else if (order === "height") {
         return b.height - a.height;
      }
      else if (order === "width") {
         return b.width - a.width;
      }
      else if (order === "created_at") {
         return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
   });

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
               {orderImages.map((imga) => (
                 <Images img= {imga} openPopup={() => setOpen(imga)}/>
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
