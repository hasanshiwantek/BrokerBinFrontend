import React, { useState } from "react";
import SearchBarWithCalendar from "./SearchBarWithCalendar ";
import css from "../styles/Menu/Manage/RfqTable.module.css";
import Search from "../svgs/Search";

const SearchComponent = () => {
  const [toggleRfqSearch, setToggleRfqSearch] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data.entries());
    formData.new == "on" ? (formData.new = 1) : (formData.new = 0);
    formData.forward == "on" ? (formData.forward = 1) : (formData.forward = 0);
    formData.reply == "on" ? (formData.reply = 1) : (formData.reply = 0);
    formData.unread == "on" ? (formData.unread = 1) : (formData.unread = 0);
    console.log(formData);
  };
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
          <form action="" method="post" onSubmit={handleSubmit}>
            <div className={css.rfqTableDetail_search_fields}>
              <div className={css.rfqTableDetail_search_fields_left}>
                <span>
                  <p>date:</p>
                  <SearchBarWithCalendar />
                </span>
                <span>
                  <p>Subject / Comments:</p>
                  <input type="text" name="subject" />
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
                  <input type="text" name="partInRfq" />
                </span>
                <span>
                  <p>Search sender information:</p>
                  <input type="text" name="searchSenderInformation" />
                </span>
              </div>
            </div>
            {/* <button type="button" className={css.rfqTableDetail_search_btn}>
            search
          </button> */}
            <input
              type="submit"
              className={css.rfqTableDetail_search_btn}
              value="search"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
