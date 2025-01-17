import "./CustomPagination.css";
const CustomPagination = ({
  currentPage,
  pages,
  handlePageChange,
  numberOfPages,
}) => {
  return (
    <div className="pagination-section">
      <button
        className={currentPage === 1 ? "same" : "greater_button"}
        onClick={() => {
          if (currentPage - 1 !== 0) {
            handlePageChange(currentPage - 1);
          }
        }}
      >
        &lt;
      </button>

      <ul className="numbers">
        {pages.map((ele, index) => {
          return (
            <li
              key={index}
              onClick={() => handlePageChange(ele)}
              className={currentPage === ele ? "activeStyle" : ""}
            >
              {ele}
            </li>
          );
        })}
      </ul>
      <button
        className={currentPage === numberOfPages ? "same" : "lower_button"}
        onClick={() => {
          if (currentPage !== numberOfPages) {
            handlePageChange(currentPage + 1);
          }
        }}
      >
        &gt;
      </button>
    </div>
  );
};
export default CustomPagination;
