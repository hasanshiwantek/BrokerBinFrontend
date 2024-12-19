// BroadcastCount.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { fetchBroadCastCount } from "../../ReduxStore/BroadCast"; // Ensure the correct path for this action

const BroadcastCount = ({ setBroadcastData }) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  
  // State to store the broadcast count data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      dispatch(fetchBroadCastCount({ token }))
        .then((response) => {
          // Assuming `response.data` contains the broadcast counts
          const { wtbCount, wtsCount, rfqCount, serviceCount } = response.data;
          // Pass data to the parent component
          setBroadcastData({
            wtbCount,
            wtsCount,
            rfqCount,
            serviceCount,
          });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [dispatch, token, setBroadcastData]);

  if (loading) {
    return <div>Loading broadcast counts...</div>;
  }

  return <></>; // This component doesn't render anything itself, it just updates state
};

export default BroadcastCount;
