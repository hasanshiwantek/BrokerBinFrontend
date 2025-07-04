import React,{useState} from "react";
import css from "../../../styles/Menu/Tools/HotList.module.css";
import { addHotListItem } from "../../../ReduxStore/ToolsSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import PopupAlert from "@/components/Popups/PopupAlert";

const HotListAdd = () => {
  const token = Cookies.get("token");
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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData)

    const rows = [];
    for (let i = 0; i < 3; i++) {
      const partModel = formData.get(`partModel_${i}`);
      if (partModel) {
        rows.push({
          partModel,
          heciClei: formData.get(`heciClei_${i}`),
          mfg: formData.get(`mfg_${i}`),
          cond: formData.get(`cond_${i}`),
          productDescription: formData.get(`productDescription_${i}`),
        });
      }
    }

    console.log(rows);

    const hotlists = rows;

    dispatch(addHotListItem({ hotlists, token }))
      .then(() => {
        showPopup("success", "Hotlists Added successfully!");
        console.log("Hotlist Saved SuccesFully");
      })
      .catch((error) => {
        console.log("Error Saving Hotlists", error);
        showPopup("error", "Failed to Add Hotlist. Try again.", {});
      });
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.tabs}>
          <ul>
            <li>
              <Link to={"/hotlist/view"}>View</Link>
            </li>
            <li>
              <Link to={"/hotlist/add"} className={css.activeTab}>
                Add
              </Link>
            </li>
            <li>
              <Link to={"/hotlist/edit"}>Edit</Link>
            </li>
          </ul>
        </div>

        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            {/* <span className={css.tabTitle}>Telecom</span> */}
            <span className={css.subTitle}>Add to Hot List</span>
          </div>

          <form onSubmit={formSubmitHandler}>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>Part / Model</th>
                  <th>HECI / CLEI</th>
                  <th>Mfg</th>
                  <th>Cond</th>
                  <th>Product Description</th>
                </tr>
              </thead>

              <tbody>
                {[0, 1, 2].map((index) => (
                  <tr key={index}>
                    <td>
                      <input type="text" name={`partModel_${index}`} />
                    </td>
                    <td>
                      <input type="text" name={`heciClei_${index}`} />
                    </td>
                    <td>
                      <input type="text" name={`mfg_${index}`} />
                    </td>
                    <td>
                      <select name={`cond_${index}`} className="border-2">
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" name={`productDescription_${index}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={css.saveButtonContainer}>
              <button
                className={`${css.saveButton} hover:!bg-blue-600 hover:-translate-y-1 transition-all ease-in-out`}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default HotListAdd;
