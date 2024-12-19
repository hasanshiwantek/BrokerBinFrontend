import React, { useState, useEffect } from "react";
import SearchBarWithCalendar from "./SearchBarWithCalendar ";
import css from "../styles/Menu/Manage/RfqTable.module.css";
import Search from "../svgs/Search";

const SearchComponent = ({onSearch, resetTrigger, isSent}) => {
  const [toggleRfqSearch, setToggleRfqSearch] = useState(false);
  const [formValues, setFormValues] = useState({
    subject: "",
    new: false,
    forward: false,
    reply: false,
    unread: false,
    partNumbers: "",
    fromDate: "",
    toDate: "",
    firstName: "",
    lastName: "",
  });


  useEffect(() => {
    setFormValues({
      subject: "",
      new: false,
      forward: false,
      reply: false,
      unread: false,
      partNumbers: "",
      fromDate: "",
      toDate: "",
      firstName: "",
      lastName: "",
    });
    console.log("SearchComponent reset triggered");
  }, [resetTrigger]);


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const formData = Object.fromEntries(data.entries());
  //   formData.new == "on" ? (formData.new = 1) : (formData.new = 0);
  //   formData.forward == "on" ? (formData.forward = 1) : (formData.forward = 0);
  //   formData.reply == "on" ? (formData.reply = 1) : (formData.reply = 0);
  //   formData.unread == "on" ? (formData.unread = 1) : (formData.unread = 0);
  //   console.log(formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  const formData = Object.fromEntries(data.entries());

    // Convert checkboxes to numeric values
    formData.new = formData.new === "on" ? 1 : 0;
    formData.forward = formData.forward === "on" ? 1 : 0;
    formData.reply = formData.reply === "on" ? 1 : 0;
    formData.unread = formData.unread === "on" ? 1 : 0;

    // console.log("Submitted Filters:", formData);
    
    onSearch(formData); // Pass filter data to parent component
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
                <SearchBarWithCalendar 
                  fromDate={formValues.fromDate} 
                  toDate={formValues.toDate} 
                  setFromDate={(date) => setFormValues((prev) => ({ ...prev, fromDate: date }))} 
                  setToDate={(date) => setFormValues((prev) => ({ ...prev, toDate: date }))} 
                />
              </span>
                <span>
                  <p>Subject / Comments:</p>
                  <input
                    type="text"
                    name="subject"
                    value={formValues.subject}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, subject: e.target.value }))
                    }
                  />
                </span>
                <span>
                  <p>status:</p>
                  <div>
                    <span>
                      <p>new</p>
                      <input
        type="checkbox"
        name="new"
        checked={formValues.new}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, new: e.target.checked }))
        }
      />
                    </span>
                    <span>
                      <p>forward</p>
                      <input
        type="checkbox"
        name="forward"
        checked={formValues.forward}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, forward: e.target.checked }))
        }
      />
                    </span>
                    <span>
                      <p>reply</p>
                      <input
        type="checkbox"
        name="reply"
        checked={formValues.reply}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, reply: e.target.checked }))
        }
      />
                    </span>
                    <span>
                      <p>unread</p>
                      <input
        type="checkbox"
        name="unread"
        checked={formValues.unread}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, unread: e.target.checked }))
        }
      />
                    </span>
                  </div>
                </span>
              </div>
              <div className={css.rfqTableDetail_search_fields_right}>
                <span>
                  <p>Part # in RFQ:</p>
                  <input
        type="text"
        name="partNumbers"
        value={formValues.partNumbers}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, partNumbers: e.target.value }))
        }
      />
                </span>
                <span>
                <p>{isSent ? "Search recipient information:" : "Search sender information:"}</p>
                  <input
                    type="text"
                    name="firstName"
                    value={`${formValues.firstName || ""} ${formValues.lastName || ""}`.trim()} // Trim unnecessary spaces
                    onChange={(e) => {
                      const parts = e.target.value.split(" ");
                      const firstName = parts[0] || ""; // First word as firstName
                      const lastName = parts.slice(1).join(" "); // Remaining words as lastName
                      setFormValues((prev) => ({
                        ...prev,
                        firstName,
                        lastName,
                      }));
                    }}
                  />
                </span>
              </div>
            </div>
            {/* <button type="button" className={css.rfqTableDetail_search_btn}>
            search
          </button> */}
            <input
              type="submit"
              className={css.rfqTableDetail_search_btn}
              // onClick={console.log("SEARCH CLICKED")}
              value="search"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
