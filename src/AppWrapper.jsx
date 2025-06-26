// src/AppWrapper.jsx
import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import useDefaultSettings from './components/hooks/UseDefaultSettings';

const AppWrapper = ({children}) => {
  const { fontSize } = useDefaultSettings();

  useEffect(() => {
      const size = fontSize ? `${parseInt(fontSize)}pt` : '8pt';
      document.documentElement.style.setProperty('--user-font-size', size);
      document.body.style.fontSize = size;
  }, [fontSize]);

  return children;
};

export default AppWrapper;

// useEffect(() => {
//   document.documentElement.style.setProperty('--user-font-size', fontSize);
// }, [fontSize]);

// useEffect(() => {
//   if (fontSize) {
//     document.body.style.fontSize = fontSize;
//   }
// }, [fontSize]);
