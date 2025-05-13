import { React, useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { fetchUserData } from "@/ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyContacts = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const companyId = Cookies.get("companyId");
  console.log(companyId);
  const { companyContactData } = useSelector(
    (store) => store.searchProductStore
  );
  console.log("Company Contact Data from frontend:", companyContactData);

  useEffect(() => {
    if (companyId && token) {
      setLoading(true); // Set loading to true when fetching data
      dispatch(getCompanyContact({ id: companyId, token }))
        .then((data) => {
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
          setLoading(false); // Set loading to false on error
        });
    } else {
      console.log("Company ID or Token is missing");
      setLoading(false); // In case no company ID or token is found
    }
  }, [dispatch, companyId, token]);

  const contacts = companyContactData?.data?.contacts || [];

  return (
    <>
      <div className={css.profileLayout}>
        <form>
          <div className={css.profileInfo}>
            <div className={css.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/mycompany"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span className="">Primary Contact</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/companyContacts"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Company Contacts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/companyContacts"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Company Info</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/mycompany/Createaccount"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Create Account</span>
                  </NavLink>
                </li> */}
              </ul>
            </div>

            <div className={css.profileInfo_form}>
              <h1>Company Contacts</h1>

              <div className={css.companyListingTable}>
                <div>
                  <table className="border cursor-pointer">
                    <thead className="bg-[#44565b] text-white text-left">
                      <tr>
                        <th className=" border"></th>
                        <th className=" border"></th>

                        <th className=" border">Name</th>
                        <th className=" border">Login</th>
                        <th className=" border">Security</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {companyContactData?.data?.contacts?.map((contact) => (
                        <tr key={contact.id} className="">
                          <td className="p-1 border w-10">
                            <input
                              type="checkbox"
                              name="checkbox"
                            />
                          </td>
                          <td className="p-1 border">
                            <i>
                              {contact.isApproved === "1" ? (
                                <span className="text-green-600 font-bold p-2">
                                  ✔
                                </span>
                              ) : (
                                <IoIosWarning className="text-red-600 p-2" />
                              )}
                            </i>
                          </td>
                          <td className="p-1 border !w-[20rem]">
                            {contact.firstName} {contact.lastName}
                          </td>
                          <td className="p-1 border">{contact.email}</td>
                          <td className="p-1 border !w-[20rem]">
                            {contact.userRole === 1
                              ? "Admin"
                              : contact.userRole === 2
                                ? "Browse only"
                                : "Unknown"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center mt-3">
              <button
                className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                type="button"
              >
                Approve
              </button>
              <button
                className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                type="button"
              >
                Edit
              </button>
              <button
                className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                type="button"
              >
                Delete
              </button>
              <button
                className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6"
                type="button"
                onClick={() => { navigate("/mycompany/Createaccount") }}
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyContacts;
