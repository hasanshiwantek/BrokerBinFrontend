import React, { useEffect, useState } from "react";
import css from "../../styles/Popup/RfqTablePopUp.module.css";
import { rfqArchive, setTogglePopUp } from "../../ReduxStore/RfqSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchUserData } from "../../ReduxStore/ProfleSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PopupAlert from "@/components/Popups/PopupAlert";

const RfqTablePopUp = ({ type }) => {
  const { rfqPopBoxInfo } = useSelector((state) => state.rfqStore);
  console.log("RFQ Pop Box Info", rfqPopBoxInfo);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const rfqNew = document.querySelector(`.${css.RfqTablePopUp_body}`);
      if (rfqNew && !rfqNew.contains(event.target)) {
        closeModal();
      }
    };

    const escKeyToggle = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", escKeyToggle);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", escKeyToggle);
    };
  }, []);

  // PRINTING LOGIC

  const handlePrint = () => {
    window.print();
  };

  const { blurWhileLoading, initialData, user, error } = useSelector(
    (state) => state.profileStore
  );
  console.log("User Data", initialData);
  const user_id = Cookies.get("user_id");
  const recieveName = initialData?.firstName;
  const receiveCompanyName = initialData?.company?.name;

  const id = user?.user?.id || user_id;
  console.log("User ID", id);
  useEffect(() => {
    console.log("Logged in userid", id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  const token = Cookies.get("token");

  const loggedInEmail = Cookies.get("email");
  console.log("Logged-in User's Email:", loggedInEmail);

  const closeModal = () => {
    const modal = document.querySelector(`.${css.RfqTablePopUp_body}`);
    if (modal) {
      modal.classList.add(css.closing); // Add the closing class
      setTimeout(() => {
        dispatch(setTogglePopUp()); // Dispatch the action to close the modal after the animation ends
      }, 300); // Match the duration of the animation (0.3s)
    }
  };

  const handleReply = (rfq) => {
    // Navigate to the reply page with selected RFQ data
    navigate("/rfq/create", {
      state: { selectedRfqs: [rfq] }, // Pass the RFQ data via state
    });
  };

  const archiveRfq = async (rfq) => {
    const token = Cookies.get("token");
    const payload = [
      {
        rfq_id: rfq.rfqId,
        status: 1,
        user_id: id,
      },
    ];
    console.log("Payload", payload);

    try {
      await dispatch(rfqArchive({ token, data: payload }));
      showPopup("success", "RFQ archived successfully!");

      closeModal(); // optional
    } catch (err) {
      console.error(err);
      showPopup("error", "Failed to archive RFQ.");
    }
  };

  return (
    <div className={css.RfqTablePopUp}>
      <div className={css.RfqTablePopUp_body}>
        <div className={css.RfqTablePopUp_body_closeBtn}>
          <button
            type="button"
            onClick={closeModal}
            className="text-black text-lg"
          >
            <AiFillCloseCircle />
          </button>
        </div>

        {rfqPopBoxInfo.map((item, index) => {
          return (
            <div key={item.id} className={css.RfqTablePopUp_body_mail}>
              <label>{type === "sent" ? "from:" : "to:"}</label>
              <p>
                {type === "sent"
                  ? "Me"
                  : (() => {
                      const loggedInEmail = Cookies.get("email");
                      const userSpecificBcc = Array.isArray(item.bcc)
                        ? item.bcc.filter((email) => email === loggedInEmail)
                        : [];
                      return userSpecificBcc.length > 0
                        ? userSpecificBcc.map((email, idx) => (
                            <span key={idx}>{email}</span>
                          ))
                        : recieveName && receiveCompanyName
                        ? `${recieveName} -  ${receiveCompanyName}`
                        : "N/A";
                    })()}
              </p>

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
            </div>

            // <div key={item.id} className={css.RfqTablePopUp_body_mail}>
            //   <label>To:</label>
            //   <p>
            //     {type === "sent"
            //       ? // Sent → show recipients
            //         Array.isArray(item.to)
            //         ? item.to.map((user, idx) => (
            //             <span key={idx}>
            //               {user.firstName} {user.lastName}, {user.company.name}
            //               {idx < item.to.length - 1 && ", "}
            //             </span>
            //           ))
            //         : "N/A"
            //       : // Received → show current user info
            //       recieveName && receiveCompanyName
            //       ? `${recieveName}, ${receiveCompanyName}`
            //       : "N/A"}
            //   </p>

            //   <label>From:</label>
            //   <p>
            //     {type === "sent"
            //       ? "me"
            //       : item.from
            //       ? `${item.from.firstName} ${item.from.lastName}, ${item.from.company.name}`
            //       : "N/A"}
            //   </p>
            // </div>
          );
        })}

        <div className={css.RfqTablePopUp_body_content}>
          {rfqPopBoxInfo.map((item) => (
            <strong>
              {/* {type === "sent"
              ? "their_request - Still looking for these parts? (Sent)"
              : "their_request - Received these parts? (Received)"} */}
              their_request - {item.subject}
            </strong>
          ))}
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
                          <td>{partNumber}</td>
                        </td>
                        <td></td>
                        <td>{item.mfgs[index] || ""}</td>
                        <td>{item.conditions[index] || ""}</td>
                        <td>{item.quantities[index] || ""}</td>
                        <td>{item.targetPrices[index] || ""}</td>
                        <td>{item.terms[index] || ""}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="whitespace-nowrap">
                <td className="pt-2">Notes</td>
                <td className={css.emailSec}>
                  <span>
                    {rfqPopBoxInfo.map((item) => (
                      <React.Fragment key={item.id}>
                        {item.comment && (
                          <div
                            dangerouslySetInnerHTML={{ __html: item.comment }}
                          ></div>
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
                        <span>{item.from?.firstName || "NA"}</span>{" "}
                        {/* Sender's Name */}
                        <span>{item.from?.company.name || "NA"}</span>{" "}
                        {/* Sender's Company */}
                        <span>{item.from?.email || "NA"}</span>{" "}
                        {/* Sender's Email */}
                      </div>
                    ))
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className={css.RfqTablePopUp_body_btn}>
          <button className="no-print" type="button" onClick={handlePrint}>
            print
          </button>
          <button type="button" onClick={() => handleReply(rfqPopBoxInfo[0])}>
            {/* Pass the first RFQ */}
            reply
          </button>
          <button type="button" onClick={() => handleReply(rfqPopBoxInfo[0])}>
            forward
          </button>
          <button
            type="button"
            onClick={() => archiveRfq(rfqPopBoxInfo[0])}
            className=""
          >
            archive
          </button>
        </div>
      </div>
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default RfqTablePopUp;
