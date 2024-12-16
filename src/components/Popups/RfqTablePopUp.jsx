import React, { useEffect } from "react";
import css from "../../styles/Popup/RfqTablePopUp.module.css";
import { setTogglePopUp } from "../../ReduxStore/RfqSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchUserData } from "../../ReduxStore/ProfleSlice";


const RfqTablePopUp = ({ type }) => {
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
  }, [dispatch]);

  const printRfq = () => {
    window.print();
  };

  const { blurWhileLoading, initialData, user, error} = useSelector(
      (state) => state.profileStore
    );
    console.log("User Data",initialData)
    const user_id = Cookies.get("user_id");

    const id = user?.user?.id || user_id;
    useEffect(() => {
      console.log("Logged in userid",id);
      dispatch(fetchUserData({ id, token }));
    }, []);

    const token = Cookies.get("token")


  const loggedInEmail = Cookies.get("email");
  console.log("Logged-in User's Email:", loggedInEmail);

  return (
    <div className={css.RfqTablePopUp}>
      <div className={css.RfqTablePopUp_body}>
        <div className={css.RfqTablePopUp_body_closeBtn}>
          <button type="button" onClick={() => dispatch(setTogglePopUp())}>
            close
          </button>
        </div>

        {rfqPopBoxInfo.map((item, index) => {
          return (
            <div key={item.id} className={css.RfqTablePopUp_body_mail}>
              <label>{type === "sent" ? "to:" : "from:"}</label>
              <p>
                {type === "sent" && Array.isArray(item.to)
                  ? item.to.map((user, idx) => (
                      <span key={idx}>
                        {user.firstName} - {user.company.name}
                        {idx < item.to.length - 1 && ", "}
                      </span>
                    ))
                  : item.from
                  ? `${item.from.firstName} - ${item.from.company.name}`
                  : "N/A"}
              </p>
              <label>{type === "sent" ? "from:" : "to:"}</label>
              <p>
              {type === "sent"
                ? "Me"
                : (() => {
                    const loggedInEmail = Cookies.get("email"); // Fetch logged-in user's email
                    const userSpecificBcc = Array.isArray(item.bcc)
                      ? item.bcc.filter((email) => email === loggedInEmail)
                      : [];
                    return userSpecificBcc.length > 0 ? (
                      userSpecificBcc.map((email, idx) => (
                        <span key={idx}>{email}</span>
                      ))
                    ) : (
                      "N/A"
                    );
                  })()}

              </p>
            </div>
          );
        })}


        <div className={css.RfqTablePopUp_body_content}>
          <strong>
            {type === "sent"
              ? "their_request - Still looking for these parts? (Sent)"
              : "their_request - Received these parts? (Received)"}
          </strong>
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
                  <React.Fragment key={item.id}>
                    {item.partNumbers.map((partNumber, index) => (
                      <tr key={`${item.id}-${index}`}>
                        <td>
                          <u>{partNumber}</u>
                        </td>
                        <td></td>
                        <td>{item.mfgs[index] || "N/A"}</td>
                        <td>{item.conditions[index] || "N/A"}</td>
                        <td>{item.quantities[index] || "N/A"}</td>
                        <td>{item.targetPrices[index] || "N/A"}</td>
                        <td>{item.terms[index] || "N/A"}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}

            </tbody>
            <tfoot>
              <tr>
                <td className="pt-2">notes</td>
                <td className={css.emailSec}>
                <span>

                {rfqPopBoxInfo.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.comment && (
                      <div dangerouslySetInnerHTML={{ __html: item.comment }}></div>
                    )}
                  </React.Fragment>
                ))}

                </span>
                  <span> --------------- </span>
                  {type === "sent" ? (
                  <>
                    <span>{initialData.firstName || "NA"}</span>
                    {/* <span>{initialData.to.company || "NA"}</span> */}
                    <span>{initialData.email || "NA"}</span>
                    <span>{initialData.user_id || "NA"}</span>
                  </>
                ) : (
                  rfqPopBoxInfo.map((item, index) => (
                    <div key={index}>
                      <span>{item.from?.firstName || "NA"}</span> {/* Sender's Name */}
                      <span>{item.from?.company.name || "NA"}</span> {/* Sender's Company */}
                      <span>{item.from?.email || "NA"}</span> {/* Sender's Email */}
                    </div>
                  ))
                )}

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

// export default RfqTablePopUp;


export default RfqTablePopUp;











