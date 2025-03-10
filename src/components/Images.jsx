import React, { useState } from "react";
import { saveAs } from "file-saver";
import { addFavourite, deleteFavourite } from "../redux/favouriteSlice";
import { useSelector, useDispatch } from "react-redux";
//imagenes
import '../scss/galery.scss';
import pencilIcon from '../assets/pencil.svg';
import heartIcon from '../assets/heart.svg';
import heartLikeIcon from '../assets/heart-fill.svg';
import downloadIcon from '../assets/download.svg';


function Images({img, openPopup}) {
    const favourites = useSelector((state) => state.favourites.fav);
    const [open, setOpen] = useState(null); // Modal
    const dispatch = useDispatch();


    const handleFavourite = (img) => {
        if (favourites.some((fav) => fav.id === img.id)) {
            dispatch(deleteFavourite(img.id));
        } else {
            dispatch(addFavourite(img));
        }
    };

    
    const downloadImage = (imageUrl, imageName) => {
        saveAs(imageUrl, imageName || "unsplash-image.jpg");
    };

    return (
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
    )
}

export default Images;