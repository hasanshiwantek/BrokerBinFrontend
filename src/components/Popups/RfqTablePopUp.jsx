import React, { useEffect } from "react";
import css from "../../styles/Popup/RfqTablePopUp.module.css";
import { setTogglePopUp } from "../../ReduxStore/RfqSlice";
import { useDispatch, useSelector } from "react-redux";

const RfqTablePopUp = () => {
  const { rfqPopBoxInfo } = useSelector((state) => state.rfqStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const rfqNew = document.querySelector(`.${css.RfqTablePopUp_body}`);
      if (rfqNew && !rfqNew.contains(event.target)) {
        dispatch(setTogglePopUp());
      }
    };

    const escKeyToggle = (event) => {
      if (event.key === "Escape") {
        dispatch(setTogglePopUp());
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", escKeyToggle);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", escKeyToggle);
    };
  }, [setTogglePopUp]);

  const printRfq = () => {
    window.print();
  };

  return (
    <div className={css.RfqTablePopUp}>
      <div className={css.RfqTablePopUp_body}>
        <div className={css.RfqTablePopUp_body_closeBtn}>
          <button type="button" onClick={() => setTogglePopUp((prev) => !prev)}>
            close
          </button>
        </div>
        {rfqPopBoxInfo.map((item) => {
          return (
            <div key={item.id} className={css.RfqTablePopUp_body_mail}>
              <label>to:</label>
              <p>{item.to}</p>
              <label>from:</label>
              <p>{item.from}</p>
            </div>
          );
        })}
        <div className={css.RfqTablePopUp_body_content}>
          <strong>their_request - Still looking for these parts? (New)</strong>
          <table>
            <thead>
              <tr>
                <th>Part #</th>
                <th>DC</th>
                <th>Mfg</th>
                <th>Cond</th>
                <th>Needed</th>
                <th>Target Price</th>
                <th>Terms</th>
              </tr>
            </thead>
            <tbody>
              {rfqPopBoxInfo.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <u>{item.model}</u>
                    </td>
                    <td>no</td>
                    <td>{item.mfg}</td>
                    <td>{item.cond}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>yes</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>notes</td>
                <td>
                  <span>
                    I see you are looking for the following parts. Ready in
                    stock and taking no regret offers. Brand new in box and
                    clean serial numbers.
                  </span>
                  <span> --------------- </span>
                  <span>Reclaim UK</span>
                  <span>Reclaim Services </span>
                  <span> P: 44 (0)162-2236205 </span>
                  <span>reclaim.brokerbin@gmail.com</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className={css.RfqTablePopUp_body_btn}>
          <button type="button" onClick={printRfq}>
            print
          </button>
          <button type="button">reply</button>
          <button type="button">forward</button>
          <button type="button">archive</button>
        </div>
      </div>
    </div>
  );
};

export default RfqTablePopUp;
