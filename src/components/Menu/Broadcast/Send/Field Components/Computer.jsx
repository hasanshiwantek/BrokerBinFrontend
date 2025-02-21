import React from "react";
import css from "../Send.module.css";
import { setComputerSelection } from "../../../../../ReduxStore/BroadCast";
import { useDispatch, useSelector } from "react-redux";

const Computer = () => {
  const computer = [
    "Barcode/ RFID",
    "Consumer Electronics",
    "Copiers/ Faxes",
    "Displays/LCD",
    "Full Systems",
    "Laptops",
    "Mainframe",
    "Memory/ CPU",
    "Midrange",
    "Networking",
    "PC's",
    "Peripherals",
    "POS/ ATM",
    "Power/PDU",
    "Printer Consumable",
    "Printers",
    "Rackmount",
    "Recycling",
    "Scrap",
    "Servers",
    "Software",
    "Storage",
    "Tape Media Medical",
    "Other",
  ];

  const dispatch = useDispatch();

  const { computerSelection } = useSelector((state) => state.broadcastStore);

  // Handle checkbox selection
  const handleCheckboxChange = (computer) => {
    const newSelection = computerSelection.includes(computer)
      ? computerSelection.filter((item) => item !== computer) // Deselect
      : [...computerSelection, computer]; // Select

    dispatch(setComputerSelection(newSelection)); // Pass the updated selection to the parent
  };
  return (
    <div className={css.toggleFieldsLayout}>
      {computer.map((item) => {
        return (
          <span>
            <label htmlFor={item}>{item}</label>
            <input
              type="checkbox"
              name={item}
              id={item}
              value={item}
              onChange={() => handleCheckboxChange(item)}
              checked={computerSelection.includes(item)}
              className="w-12 h-6"
            
            />
          </span>
        );
      })}
    </div>
  );
};

export default Computer;
