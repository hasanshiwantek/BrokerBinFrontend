import React, { useEffect } from "react";
import css from "../../styles/Popup/RfqTablePopUp.module.css";
import { IoCloseCircle } from "react-icons/io5";

const RfqTablePopUp = ({ setTogglePopUp }) => {

  useEffect(() => {
    const handleClickOutside = (event) => {
      const rfqNew = document.querySelector(`.${css.RfqTablePopUp_body}`);
      if (rfqNew && !rfqNew.contains(event.target)) {
        setTogglePopUp((prev) => !prev);
      }
    };

    const escKeyToggle = (event) => {
      if (event.key === "Escape") {
        setTogglePopUp((prev) => !prev);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", escKeyToggle);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", escKeyToggle);
    };
  }, [setTogglePopUp]);

  return (
    <div className={css.RfqTablePopUp}>
      <div className={css.RfqTablePopUp_body}>
        <div className={css.RfqTablePopUp_body_closeBtn}>
          <button type="button" onClick={() => setTogglePopUp((prev) => !prev)}>
            close
          </button>
        </div>
        <div className={css.RfqTablePopUp_body_mail}>
          <label>to:</label>
          <p>kaifabbas,CTS</p>
          <label>from:</label>
          <p>hasanmujtaba,newtown</p>
        </div>
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
              <tr>
                <td>
                  <u>C9200L-48P-4X-E</u>
                </td>
                <td>no</td>
                <td>CISCO </td>
                <td>NEW</td>
                <td>20</td>
                <td>120</td>
                <td>yes</td>
              </tr>
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
          <button type="button">print</button>
          <button type="button">reply</button>
          <button type="button">forward</button>
          <button type="button">archive</button>
        </div>
      </div>
    </div>
  );
};

export default RfqTablePopUp;
