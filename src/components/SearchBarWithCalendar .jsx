import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBarWithCalendar = ({fromDate, toDate, setFromDate, setToDate}) => {
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);
  const [showDatePickerFrom, setShowDatePickerFrom] = useState(false);
  const [showDatePickerTo, setShowDatePickerTo] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const handleFocusFrom = () => {
    setShowDatePickerFrom(true);
  };
  const handleFocusTo = () => {
    setShowDatePickerTo(true);
  };
  const handleBlurFrom = (event) => {
    setTimeout(() => {
      if (!fromInputRef.current.contains(event.relatedTarget)) {
        setShowDatePickerFrom(false);
      }
    }, 200);
  };
  const handleBlurTo = (event) => {
    setTimeout(() => {
      if (!toInputRef.current.contains(event.relatedTarget)) {
        setShowDatePickerTo(false);
      }
    }, 200);
  };

  useEffect(() => {
    if (!fromDate) {
      setShowDatePickerFrom(false);
    }
    if (!toDate) {
      setShowDatePickerTo(false);
    }
  }, [fromDate, toDate]);

  const handleChangeFrom = (date) => {
    setFromDate(date);
    setShowDatePickerFrom(false);
  };
  const handleChangeTo = (date) => {
    setToDate(date);
    setShowDatePickerTo(false);
  };

  const handleInputChangeFrom = (e) => {
    const value = e.target.value;
    if (!value) {
      setFromDate(null);
    }
  };
  const handleInputChangeTo = (e) => {
    const value = e.target.value;
    if (!value) {
      setToDate(null);
    }
  };


  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ position: "relative" }} ref={fromInputRef}>
        <input
          type="text"
          onFocus={handleFocusFrom}
          onBlur={handleBlurFrom}
          value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
          style={{ height: "1rem" }}
          name="fromDate"
          readOnly
        />
        {showDatePickerFrom && (
          <div style={{ position: "absolute", top: "100%", left: "0" }}>
            <DatePicker
              selected={fromDate}
              onChange={handleChangeFrom}
              dateFormat="yyyy-MM-dd"
              inline
            />
          </div>
        )}
      </div>
      <p>to</p>
      <div style={{ position: "relative" }} ref={toInputRef}>
        <input
          type="text"
          onFocus={handleFocusTo}
          onBlur={handleBlurTo}
          value={toDate ? toDate.toISOString().split("T")[0] : ""}
          style={{ height: "1rem" }}
          name="toDate"
          readOnly
        />
        {showDatePickerTo && (
          <div style={{ position: "absolute", top: "100%", left: "0" }}>
            <DatePicker
              selected={toDate}
              onChange={handleChangeTo}
              dateFormat="yyyy-MM-dd"
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarWithCalendar;
