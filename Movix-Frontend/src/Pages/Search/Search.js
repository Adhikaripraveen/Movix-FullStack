import { useState, useEffect } from "react";
import "./search.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";
const Search = () => {
  const [content, setContent] = useState([]);
  const [type, setType] = useState("tv");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [searchClicked, setSearchClicked] = useState(false);
  // const [page, setPage] = useState();

  let pages = Array.from(Array(numberOfPages), (_, index) => index + 1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  const mystyle = {
    fontSize: "3rem",
    color: "black",
    background: "white",
    height: "5rem",
    width: "8rem",
    borderRadius: "1rem",
    cursor: "pointer",
  };
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

  const fetchSearch = async () => {
    axios.defaults.withCredentials = false;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`,
      {
        withCredentials: false, // Disable sending cookies with this request
      }
    );

    setContent(data.results);

    if (data.total_pages > 1) {
      setNumberOfPages(data.total_pages);
    }
    if (data.total_pages > 10) {
      setNumberOfPages(10);
    }

    setSearchClicked(true);
  };

  useEffect(() => {
    if (searchClicked) {
      fetchSearch();
    }
    // eslint-disable-next-line
  }, [type, currentPage, searchClicked]);
  const gettingText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search_section">
      <div>
        <input
          className="input"
          type="text"
          placeholder="Search "
          onChange={gettingText}
        />
        <button id="search_button" onClick={fetchSearch}>
          <SearchIcon style={mystyle} />
        </button>
      </div>

      <div className="show_section">
        <div
          className={type === "tv" ? "active_search" : "series"}
          onClick={() => {
            setType("tv");
            setCurrentPage(1);
          }}
        >
          TV Series
        </div>
        <div
          className={type === "movie" ? "active_search" : "movies"}
          onClick={() => {
            setType("movie");
            setCurrentPage(1);
          }}
        >
          Movies
        </div>
      </div>
      <div className="search_content">
        {searchClicked && content.length === 0 && (
          <h2 className="abc">Not Found!!!!</h2>
        )}
        {content.length > 0 &&
          content.map((e) => {
            return (
              <SingleContent
                key={e.id}
                id={e.id}
                poster={e.poster_path}
                title={e.title || e.name}
                formattedDate={formatDate(e.first_air_date || e.release_date)}
                media_type={type}
                rating={e.vote_average}
              />
            );
          })}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          pages={pages}
          handlePageChange={handlePageChange}
          numberOfPages={numberOfPages}
        />
      )}
    </div>
  );
};
export default Search;
