import "./Header.css";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useWatchList } from "../../WatchListProvider";
import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from "axios";
const Header = (props) => {
  const [logModal, setLogModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {loggedIn,setLoggedIn}=props.checkUser;
 
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const moveToTop = () => {
    return window.scrollTo(0, 0);
  };
  const showLog = (value) => {
    if (value === true) {
      setLogModal(true);
      setDropDown(false);
    } else setLogModal(false);
  };
  const showSign = (value) => {
    if (value === true) {
      setSignModal(true);
      setDropDown(false);
    } else setSignModal(false);
  };
  const myIcon = {
    fontSize: "3.5rem",
    color: "white",
  };
  const toggleDrop = (dropDown) => {
    setDropDown((dropDown) => !dropDown);
  };
  const { watchListItems } = useWatchList();
  

  useEffect(() => {
    if (watchListItems) {
      setIsLoading(false);
    }
  }, [watchListItems]);

  const handleLogOut=async()=>{
    try{
      axios.defaults.withCredentials=true;
      const response=await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/Auth/logout`,{
        withCredentials:true,
      });
      console.log(response)
      sessionStorage.removeItem("user")
     
    }catch(err){
      console.log(err)
    }

    setIsOpen(false);
    setLoggedIn(false);
    navigate("/trending")
  }
  
const handleLogIn=()=>{
   showLog(true)
   navigate("/Login")
}
const handleSignIn =()=>{
  showLog(true);
  navigate("/Sign-in")
}
  
  return (
    <>
      <div className="header">
        <div className="site_title">
          <h2 onClick={moveToTop}>MOVIX </h2>
        </div>
        <div className="button_section">
          <NavLink to="/watchList">
            <button className=" watch">
            Watchlist
            </button>
          </NavLink>

         {!loggedIn && <button className="Add_icon" onClick={() => toggleDrop(dropDown)}>
            <PersonAddAltIcon style={myIcon} />
          </button>}
          {
            loggedIn && <button className="Add_icon" onClick={toggleDropdown}>
              <AccountCircle style={myIcon}/>
              </button>
          }
          {dropDown && (
            <div className="drop_down">
              <ul>
                <li>
                  <button className="drop_button" onClick={handleLogIn}>
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    className="drop_button"
                    onClick={handleSignIn}
                  >
                    Sign in
                  </button>
                </li>
                
              </ul>
            </div>
          )}
         {
  loggedIn ? (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="button">
        Profile
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu"
          style={{ backgroundColor: "white" }}
          type="none"
        >
          <li onClick={() => setIsOpen(false)}>
            <Link to="/EditProfile">Edit Profile</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/UpdatePassword">Update Password</Link>
          </li>
          <li onClick={handleLogOut}>
            <Link>Log Out</Link>
          </li>
        </ul>
      )}
    </div>
  ) : (
    <>
    <Link to="/Login">
      <button className="button" onClick={() => showLog(true)}>
        Log in
      </button>
    </Link>
    <Link to="/Sign-in">
      <button className="button" onClick={() => showSign(true)}>
        Sign in
      </button>
    </Link>
    </>
  )
}

        </div>
      </div>
      {/* {logModal && <Login show={{ showLog,setLoggedIn,loggedIn  }} />}
      {signModal && <Sign show={{ showSign }} />} */}
    </>
  );
};
export default Header;
