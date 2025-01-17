import WhatshotIcon from "@mui/icons-material/Whatshot";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
<p></p>;
const Navbar = () => {
  const [tab, setTab] = useState("trending");
  const myStyle = {
    fontSize: "3rem",
    color: "white",
  };
  const handleTabClick = (tab) => {
    setTab(tab);
  };
  const activeStyle = {
    ...myStyle,
    color: "#ff8b13",
  };
  return (
    <>
      <div className="container">
        <NavLink to="/trending" onClick={() => handleTabClick("trending")}>
          <WhatshotIcon style={tab === "trending" ? activeStyle : myStyle} />
          <p className={tab === "trending" ? "active" : ""}>Trending</p>
        </NavLink>
        <NavLink to="/Movies" onClick={() => handleTabClick("Movies")}>
          <MovieFilterIcon style={tab === "Movies" ? activeStyle : myStyle} />
          <p className={tab === "Movies" ? "active" : ""}>Movies</p>
        </NavLink>
        <NavLink to="/tv" onClick={() => handleTabClick("tv")}>
          <TvIcon style={tab === "tv" ? activeStyle : myStyle} />
          <p className={tab === "tv" ? "active" : ""}>TV</p>
        </NavLink>
        <NavLink to="/Search" onClick={() => handleTabClick("search")}>
          <SearchIcon style={tab === "search" ? activeStyle : myStyle} />
          <p className={tab === "search" ? "active" : ""}>Search</p>
        </NavLink>
      </div>
    </>
  );
};
export default Navbar;
