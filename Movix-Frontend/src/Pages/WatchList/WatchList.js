import { useWatchList } from "../../WatchListProvider";
import SingleContent from "../../Components/SingleContent/SingleContent";
import {useEffect} from 'react'
import "./watchList.css" ;
const WatchList = () => {
  const { watchListItemsArray, fetchWatchList } = useWatchList();
  useEffect(() => {
    fetchWatchList();
  }, []);
  return (
    <>
      <div className="watchlist_section">
        {watchListItemsArray && watchListItemsArray.length > 0 ? (
          watchListItemsArray.map((e,i) => {
            return (
              <SingleContent
              key={e.mediaId}
                id={e.mediaId}
                title={e.title}
                poster={e.poster}
                media_type={e.media_type}
                rating={e.rating}
                formattedDate={e.formattedDate}
              />
            );
          })
        ) : (
          <div className="empty_watchlist">
            <h2>Your Watchlist is Empty</h2>
            <p>
              Start adding movies and shows you want to watch by clicking the
              "Add to Watchlist" button on content pages.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default WatchList;
