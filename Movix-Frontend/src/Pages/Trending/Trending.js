import { useState, useEffect } from "react";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import "./Trending.css";
import axios from "axios";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const trendingData = async () => {
    try {
      axios.defaults.withCredentials = false;
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`,
        {
          withCredentials: false,
        }
      );

      
      setContent(data.results);
      setError(null);
    } catch (error) {
      
      setError(error);
      new Error(error) ;
    }
  };

  useEffect(() => {
    trendingData();
    // eslint-disable-next-line
  }, [currentPage]);
  const arr = Array.from({ length: 20 }, (_, index) => index);
  let numberOfPages = 10;
  let pages = Array.from(Array(numberOfPages), (_, index) => index + 1);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {error && <div className="axios_error">{error.message}!!!</div>}
      <div className="trending_title">
        <h2>Trending</h2>
      </div>

      <div className="trending-section">
        {content.length === 0 ? (
          <div className="loading_container">
            {arr.map((e, index) => {
              return <div className="card" key={index}></div>;
            })}
          </div>
        ) : (
          content &&
          content.map((e) => {
            return (
              <SingleContent
                key={e.id}
                id={e.id}
                poster={e.poster_path}
                title={e.title || e.name}
                formattedDate={formatDate(e.first_air_date || e.release_date)}
                media_type={e.media_type}
                rating={e.vote_average}
              />
            );
          })
        )}
      </div>
      <CustomPagination
        currentPage={currentPage}
        pages={pages}
        handlePageChange={handlePageChange}
        numberOfPages={numberOfPages}
      />
    </>
  );
};
export default Trending;
