import { img_300, unavailable } from "../../config/config";
import "./Singlecontent.css";
import { NavLink } from "react-router-dom";

const SingleContent = ({
  id,
  poster,
  title,
  formattedDate,
  media_type,
  rating,
}) => {
 
  const ratingStyle = {
    backgroundColor: rating > 5 ? "green" : "red",
  };

  
  return (
    <NavLink className="navLink" to={`/Modal/${id}/${media_type}`}>
      <div className="content">
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt="title"
        ></img>
        <h2 className="title">{title}</h2>
        <div className="detail">
          <div className="detail">
            {media_type === "tv" ? "TV Series" : "Movie"}
          </div>
          <div className="detail">{formattedDate}</div>
        </div>
        {rating !== 0 && (
          <div style={ratingStyle} className="rating">
            {rating?.toFixed(1)}
          </div>
        )}
      </div>
    </NavLink>
  );
};
export default SingleContent;
