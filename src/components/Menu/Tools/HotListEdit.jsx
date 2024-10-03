import { React, useEffect } from "react";
import css from "../../../styles/Menu/Tools/HotList.module.css";
import { showHotListItem } from "../../../ReduxStore/ToolsSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { editHotListItem } from "../../../ReduxStore/ToolsSlice";

const HotListEdit = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const items = useSelector((state) => state.toolsStore.myHotListItems);
  console.log("items:", items);

  useEffect(() => {
    dispatch(showHotListItem({ token }));
  }, [dispatch, token]);

  const updateHotList = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rows = [];
    for (let i = 0; i < items.length; i++) {
      const partModel = formData.get(`partModel_${i}`);   
      if (partModel) {
        rows.push({
          id: items[i].id,
          partModel: formData.get(`partModel_${i}`),
          heciClei: formData.get(`heciClei_${i}`),
          mfg: formData.get(`mfg_${i}`),
          cond: formData.get(`cond_${i}`),
          productDescription: formData.get(`productDescription_${i}`),
        });
      }
    }

    console.log(rows);

    const hotlists = rows;
    dispatch(editHotListItem({ token, hotlists }));
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
              <Link to={"/hotlist/add"}>Add</Link>
            </li>
            <li>
              <Link to={"/hotlist/edit"}>Edit</Link>
            </li>
          </ul>
        </div>

        <div className={css.tableWrapper}>
          <div className={css.secHeader}>
            <div className={css.tableHeader}>
              <span className={css.tabTitle}>Telecom</span>
              <span className={css.subTitle}>Edit HotList</span>
            </div>
            <div className={css.manufacturerDropdown}>
              <span> Manufacturer:&nbsp;</span>
              <select>
                <option value="all">Show All</option>
                <option value="hp">HP</option>
                <option value="dell">Dell</option>
                <option value="lenovo">Lenovo</option>
              </select>
            </div>
          </div>

          <form onSubmit={updateHotList}>
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

              {items.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name={`partModel_${index}`}
                          defaultValue={item.part_model}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`heciClei_${index}`}
                          defaultValue={item.heciClei}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`mfg_${index}`}
                          defaultValue={item.manufacturer}
                        />
                      </td>
                      <td>
                        <select
                          name={`cond_${index}`}
                          defaultValue={item.condition}
                        >
                          <option value="New">New</option>
                          <option value="Used">Used</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`productDescription_${index}`}
                          defaultValue={item.product_description}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <div className={css.saveButtonContainer}>
              <button className={css.saveButton} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className={css.footer}>
        <a href="/">Advertising Programs</a>
        <a href="/">Business Solutions</a>
        <a href="/">About BrokerBin.com</a>
      </footer>
      <p className={css.p}>© 2024 Privacy</p>
    </>
  );
};

export default HotListEdit;
