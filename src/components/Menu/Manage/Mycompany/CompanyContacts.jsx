import { React, useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { getCompanyContact } from "@/ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompanyContact } from "@/ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import PopupAlert from "@/components/Popups/PopupAlert";

const CompanyContacts = () => {
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one contact to delete.");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmDeleteContacts = async () => {
    try {
      const result = await dispatch(
        deleteCompanyContact({ ids: selectedIds, token })
      ).unwrap();

      if (result?.status) {
        showPopup(
          "success",
          result?.message || "Selected contacts deleted successfully!"
        );
        setSelectedIds([]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        showPopup("error", result?.message || "Failed to delete contacts.");
      }
    } catch (err) {
      showPopup("error", `Error deleting contacts: ${err.message}`);

      console.error("Error during deletion or reload:", err);
    } finally {
      setShowConfirmModal(false);
    }
  };

  // UPDATE COPMANY USER LOGIC:

  const navigate = useNavigate();
  const handleEditContact = () => {
    if (selectedIds.length !== 1) {
      alert("Please select exactly one contact to edit.");
      return;
    }

    const contactToEdit = contacts.find((c) => c.id === selectedIds[0]);
    if (!contactToEdit) {
      showPopup("error", "Selected contact not found.");

      return;
    }

    navigate("/updatecompanyuser", {
      state: { contact: contactToEdit },
    });
  };

  const loggedInUserId = Number(Cookies.get("user_id"));
  const primaryContactId = companyContactData.data?.company?.primaryContact?.id;

  console.log(loggedInUserId, primaryContactId);

  return (
    <>
      <div className={`${css.profileLayout} `}>
        <form>
          <div className={`${css.profileInfo} min-w-[54vw]`}>
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
                <li>
                  <NavLink
                    to="/mycompany/SalesInfo"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Sales Info</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mycompany/Photos"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Photos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mycompany/Billing+Info"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Billing</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={css.profileInfo_form}>
              <h1>Company Contacts</h1>

              <div className={css.companyListingTable}>
                <div>
                  {loading ? (
                    <div className="flex justify-center  items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                      <span className="ml-4 text-blue-600 text-lg font-medium"></span>
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
                    account) Your account is editable through{" "}
                    <NavLink to={"/myProfile"}>My Profile</NavLink>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center mt-3">
              <button
                className={
                  loggedInUserId != primaryContactId
                    ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                    : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                }
                type="button"
                disabled={loggedInUserId != primaryContactId}
              >
                Approve
              </button>

              <button
                className={
                  loggedInUserId != primaryContactId
                    ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                    : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                }
                type="button"
                onClick={handleEditContact}
                disabled={loggedInUserId != primaryContactId}
              >
                Edit
              </button>

              <button
                className={
                  loggedInUserId != primaryContactId
                    ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                    : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                }
                type="button"
                onClick={handleDeleteClick}
                disabled={loggedInUserId != primaryContactId}
              >
                Delete
              </button>
              <NavLink to={"/CreateAccount"}>
                <button
                  className={
                    loggedInUserId != primaryContactId
                      ? "cursor-not-allowed !bg-[#2c83ec]  !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 disabled:first"
                      : "!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-6 "
                  }
                  type="button"
                  disabled={loggedInUserId != primaryContactId}
                >
                  Create Account
                </button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-10 max-w-2xl w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Are you sure you want to delete the selected user(s)?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDeleteContacts}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default CompanyContacts;
