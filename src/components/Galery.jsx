import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery } from "../redux/GalerySlice";
import '../scss/galery.scss'
import pencilIcon from '../assets/pencil.svg'
import hearFilltIcon from '../assets/heart-fill.svg'
import heartIcon from '../assets/heart.svg'
import downloadIcon from '../assets/download.svg'
import Modal from "./modal";

const Galery = () => {
  const dispatch = useDispatch();
  const {images, loading, error} = useSelector((state) => state.galery)
  const [open, setOpen] = useState(false);
  
//   useEffect(() => {
//    console.log(images);
   
//    if(loading === false){
//       dispatch(imgGalery())
//    } else{
      
//    }

//    if (error !== null) {
//       console.log(error);
      
//    }
//   }, [ loading, error])

    useEffect(() => {
        dispatch(imgGalery());
    }, [dispatch]);  


  return (

    <div className="gallery">
      <Modal />
       {images.map((img) => (
          <div className="gallery__container" key={img.id}>
             <img src={img.urls.small} alt={img.alt_description} />
             <div className="gallery__options">
                <button className="save-btn"><img src={heartIcon} alt="icono de un lapiz" /></button>
                <button className="save-btn"><img src={pencilIcon} alt="icono de un corazon vacio" /></button>
                <button className="save-btn"><img src={downloadIcon} alt="icono de descargar" /></button>
             </div>
          </div>
       ))}
    </div>
 );
};

export default Galery;
