import React, { useState } from "react";
import SearchBarWithCalendar from "./SearchBarWithCalendar ";
import css from "../styles/Menu/Manage/RfqTable.module.css";
import Search from "../svgs/Search";

const SearchComponent = () => {
  const [toggleRfqSearch, setToggleRfqSearch] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setToggleRfqSearch((prev) => !prev)}
        className={css.rfqTableSearchToggle}
      >
        <Search />
        search
      </button>
      {toggleRfqSearch && (
        <div className={css.rfqTableDetail_search}>
          <div className={css.rfqTableDetail_search_fields}>
            <div className={css.rfqTableDetail_search_fields_left}>
              <span>
                <p>date:</p>
                <SearchBarWithCalendar />
              </span>
              <span>
                <p>Subject / Comments:</p>
                <input type="text" />
              </span>
              <span>
                <p>status:</p>
                <div>
                  <span>
                    <p>new</p>
                    <input type="checkbox" name="new" id="new" />
                  </span>
                  <span>
                    <p>forward</p>
                    <input type="checkbox" name="forward" id="forward" />
                  </span>
                  <span>
                    <p>reply</p>
                    <input type="checkbox" name="reply" id="reply" />
                  </span>
                  <span>
                    <p>unread</p>
                    <input type="checkbox" name="unread" id="unread" />
                  </span>
                </div>
              </span>
            </div>
            <div className={css.rfqTableDetail_search_fields_right}>
              <span>
                <p>Part # in RFQ:</p>
                <input type="text" />
              </span>
              <span>
                <p>Search sender information:</p>
                <input type="text" />
              </span>
            </div>
          </div>
          <button type="button" className={css.rfqTableDetail_search_btn}>
            search
          </button>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
