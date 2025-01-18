import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import { img_300, noPicture } from "../../config/config";
import "./carousel.css";
const Carousel = ({ id, media_type }) => {
  const [carousel, setCarousel] = useState([]);
  const fetchCarousel = async () => {
    axios.defaults.withCredentials=false;
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,{
        withCredentials: false,
      }
      
    );
  
    setCarousel(data.cast);
  };

  useEffect(() => {
    fetchCarousel();
    // eslint-disable-next-line
  }, [media_type, id]);

  const handleDragStart = (e) => e.preventDefault();

  const items = carousel?.map((c) => {
    return (
      <>
        <div className="carousel_item">
          <img
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c.name}
            onDragStart={handleDragStart}
            className="carousel_img"
          />
          <p className="item_name">{c.name}</p>
        </div>
      </>
    );
  });

  const responsive = {
    0: {
      items: 3,
    },
    762: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return (
    <>
      {carousel.length > 0 && (
        <div className="carousel_container">
          <p className="cast">Cast</p>
          <AliceCarousel
            autoPlay
            responsive={responsive}
            infinite
            disableDotsControls
            mouseTracking
            items={items}
            disableButtonsControls={true}
          />
        </div>
      )}
    </>
  );
};

// <div>
//   <div className="loading_cast">
//     <div className="card-cast"></div>
//     <div className="card-cast"></div>
//     <div className="card-cast"></div>
//     <div className="card-cast"></div>
//     <div className="card-cast"></div>
//   </div>
// </div>
export default Carousel;
