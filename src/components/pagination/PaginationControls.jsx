// components/common/PaginationControls.js
import React from "react";

const PaginationControls = ({
  currPage,
  totalPages,
  visiblePages,
  onPageChange,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2 mt-4">
      <button
        className={`px-3 py-1 border rounded transition ${
          visiblePages[0] === 1
            ? "opacity-50 cursor-not-allowed text-blue-300"
            : "text-blue-600 hover:bg-blue-100 border-blue-300"
        }`}
        disabled={visiblePages[0] === 1}
        onClick={onPrev}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        if (page < visiblePages[0] || page > visiblePages[1]) return null;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border transition ${
              currPage === page
                ? "!bg-blue-300 text-white border-blue-600"
                : "border-gray-300 text-blue-600 hover:bg-blue-400"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`px-3 py-1 border rounded transition ${
          visiblePages[1] === totalPages
            ? "opacity-50 cursor-not-allowed text-blue-300"
            : "text-blue-600 hover:bg-blue-100 border-blue-400"
        }`}
        disabled={visiblePages[1] === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
