import { React, useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompanyContact } from "@/ReduxStore/SearchProductSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const CompanyContacts = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
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

  // REMOVE CONTACT LOGIC
  const [selectedIds, setSelectedIds] = useState([]);

  // Handle checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const removeCompanyContacts = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the selected user(s)?"
    );

    if (!isConfirmed || selectedIds.length === 0) return;
    try {
      const result = await dispatch(
        deleteCompanyContact({ ids: selectedIds, token })
      ).unwrap();

      if (result?.status) {
        console.log("✅ Deleted users:", selectedIds);
        toast.info(
          result?.message || "Selected contacts deleted successfully!"
        );
        setSelectedIds([]); // Clear after deletion
        dispatch(getCompanyContact({ id: companyId, token })); // Refresh contact list
      } else {
        toast.info(result?.message || "Failed to delete contacts.");
      }
    } catch (err) {
      toast.error("❌ Error deleting contacts: " + err.message);
      console.log("Error:", err.message);
    }
  };

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
                    to="/mycompany/CompanyInfo"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Company Info</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/Createaccount"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Create Account</span>
                  </NavLink>
                </li>  */}
              </ul>
            </div>

            <div className={css.profileInfo_form}>
              <h1>Company Contacts</h1>

              <div className={css.companyListingTable}>
                <div>
                  {loading ? (
                    <div className="text-center py-4 text-gray-600">
                      Loading contacts...
                    </div>
                  ) : (
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
                        {companyContactData?.data?.contacts?.length > 0 ? (
                          companyContactData.data.contacts.map((contact) => (
                            <tr key={contact.id} className="">
                              <td className="p-1 border w-10">
                                <input
                                  type="checkbox"
                                  name="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(contact.id)
                                  }
                                  checked={selectedIds.includes(contact.id)}
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
                              <td className="p-1 border !w-[25rem]">
                                {contact.firstName} {contact.lastName}
                              </td>
                              <td className="p-1 border">{contact.email}</td>
                              <td className="p-1 border !w-[22rem]">
                                {contact.userRole === 1
                                  ? "Admin"
                                  : contact.userRole === 2
                                    ? "Browse only"
                                    : "Unknown"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="text-center p-4 text-gray-500"
                            >
                              No contacts found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                  <p className="pt-4 italic text-gray-600 text-[7.5pt] leading-tight w-96">
                    (Select account to approve/edit/delete Or create a new
                    account) Your account is editable through <NavLink to={"/myProfile"}>My Profile</NavLink>
                  </p>
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
                onClick={removeCompanyContacts}
              >
                Delete
              </button>
              <NavLink to={"/CreateAccount"}>
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7"
                  type="button"
                >
                  Create Account
                </button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CompanyContacts;
