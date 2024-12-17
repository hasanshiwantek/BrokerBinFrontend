import React, {useEffect} from 'react'
import RfqTable from '../Manage/RfqTable.jsx'
import { sentRfq } from "../../../ReduxStore/RfqSlice.js";
import { receivedRfq } from "../../../ReduxStore/RfqSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";




const MyRFQ = () => {
  // const [counts, setCounts] = useState({ received: 0, sent: 0 });

  const receiveRfqData = useSelector((state) => state.rfqStore.receiveRfqData);
  const sentRfqData = useSelector((state) => state.rfqStore.sentRfqData);

  const token = Cookies.get("token")

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch both thunks in parallel
    dispatch(receivedRfq({ token }));
    // dispatch(sentRfq({ token }));
  }, [ ]);
  
  return (
    <RfqTable/>
   
  )
}

export default MyRFQ
