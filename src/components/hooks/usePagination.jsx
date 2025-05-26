// hooks/usePagination.js
import { useState, useEffect } from "react";

const usePagination = ({
  token,
  totalPages = 1,
  defaultPage = 1,
  fetchAction,
  fetchSortedAction,
  isSorted = false,
  sortBy = "",
  sortOrder = "asc",
}) => {
  const [curr_Page, setCurrPage] = useState(defaultPage);
  const [visiblePages, setVisiblePages] = useState([1, Math.min(10, totalPages)]);

  useEffect(() => {
    setVisiblePages([1, Math.min(10, totalPages)]);
  }, [totalPages]);

  const fetchData = (dispatch, page) => {
    const action = isSorted
      ? fetchSortedAction({ token, page, sortBy, sortOrder })
      : fetchAction({ token, page });
    return dispatch(action);
  };

  const handlePageChange = (page, dispatch) => {
    if (page >= 1 && page <= totalPages) {
      setCurrPage(page);
      fetchData(dispatch, page);
    }
  };

  const handlePrevious = (dispatch) => {
    if (visiblePages[0] > 1) {
      const newPage = visiblePages[0] - 1;
      setVisiblePages([Math.max(newPage - 9, 1), newPage]);
      setCurrPage(newPage);
      fetchData(dispatch, newPage);
    }
  };

  const handleNext = (dispatch) => {
    if (visiblePages[1] < totalPages) {
      const newPage = visiblePages[1] + 1;
      setVisiblePages([newPage, Math.min(newPage + 9, totalPages)]);
      setCurrPage(newPage);
      fetchData(dispatch, newPage);
    }
  };

  return {
    curr_Page,
    visiblePages,
    handlePageChange,
    handlePrevious,
    handleNext,
  };
};

export default usePagination;
