import axios from "axios";
import { useEffect, useState } from "react";
import "./Genre.css";
const Genre = ({ setCurrentPage, setSelectGenre, selectGenre, type }) => {
  const [genre, setGenre] = useState([]);
  const fetchGenre = async () => {
    axios.defaults.withCredentials=false;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,{
        withCredentials: false // Disable sending cookies with this request
      }
      // eslint-disable-next-line
    );

    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenre();
    // eslint-disable-next-line
  }, []);

  const handleAdd = (genreItem) => {
    setSelectGenre([...selectGenre, genreItem]);
    setGenre(() => genre.filter((g) => g.id !== genreItem.id));
    setCurrentPage(1);
  };
  const handleRemove = (genreItem) => {
    setSelectGenre(
      selectGenre.filter((selectedGenre) => selectedGenre.id !== genreItem.id)
    );
    setGenre([...genre, genreItem]);
    setCurrentPage(1);
  };

  return (
    <div className="genre_section">
      {selectGenre.map((genreItem) => (
        <span
          className="select_genre"
          key={genreItem.id}
          onClick={() => handleRemove(genreItem)}
        >
          {genreItem.name}
        </span>
      ))}

      {genre.map((genreItem) => (
        <span
          className="genre"
          key={genreItem.id}
          onClick={() => handleAdd(genreItem)}
        >
          {genreItem.name}
        </span>
      ))}
    </div>
  );
};
export default Genre;
