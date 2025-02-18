import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery } from "../redux/GalerySlice";
import '../scss/galery.scss'

const Galery = () => {
  const dispatch = useDispatch();
  const {images} = useSelector((state) => state.galery)
  
  useEffect(() => {
    dispatch(imgGalery())
  }, [dispatch])

  return (
   <div className="show" >
      { images.map((img) => (
          <img key={img.id} src={img.urls.small} alt={img.alt_description} />
        ))
      }
   </div>
  );
};

export default Galery;
