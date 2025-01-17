import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const WatchContext = createContext();
export const useWatchList = () => {
  return useContext(WatchContext);
};
const WatchListProvider = ({ children }) => {
  const [watchListItems, setWatchListItems] = useState([]);
  const [watchListItemsArray, setWatchListItemsArray] = useState([]);

  const checkIsInWatchList = (movieId) => {
    return watchListItemsArray?.some((item) => item.id === movieId);
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

  const fetchWatchList = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/WatchList/watchListItems`,
        {
          withCredentials: true,
        }
      );

      setWatchListItemsArray(response.data.watchList);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const contextValue = {
    watchListItems,
    setWatchListItems,
    formatDate,
    fetchWatchList,
    watchListItemsArray,
    checkIsInWatchList,
  };
  return (
    <>
      <WatchContext.Provider value={contextValue}>
        {children}
      </WatchContext.Provider>
    </>
  );
};
export default WatchListProvider;
