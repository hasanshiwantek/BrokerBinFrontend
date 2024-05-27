import React, { createContext } from "react";

const PopUpContextAll = createContext();
const PopupContext = ({children}) => {
  const [togglePopUp, setTogglePopUp] = useState(false);
  const popUpToggle = () => {
    setTogglePopUp(!togglePopUp);
  };
  return (
    <PopUpContextAll.Provider value={{ togglePopUp, popUpToggle }}>
      {children}
    </PopUpContextAll.Provider>
  );
};

export default PopupContext;
