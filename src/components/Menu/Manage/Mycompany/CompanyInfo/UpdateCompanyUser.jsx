import React, { useEffect, useState } from "react";
import css from "@/styles/Menu/Manage/MyProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCompanyUserData } from "@/ReduxStore/ProfleSlice";
const UpdateCompanyUser = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const contact = state?.contact;
  console.log("Selected Contact: ", contact);
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setForm({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phoneNumber: contact.phoneNumber || "",
        cellular: contact.cellular || "",
        tollFree: contact.tollFree || "",
        faxNumber: contact.faxNumber || "",
        position: contact.position || "",
        specialty: contact.specialty || "",
        country: contact.country || "",
        region: contact.region || "",
        address: contact.address || "",
        city: contact.city || "",
        state: contact.state || "",
        zipcode: contact.zipcode || "",
        website: contact.website || "",
        userId: contact.userId || "",
        company_id: contact.company_id,
        userRole: contact.userRole,
        profileImage: contact.profileImage || "",

        imScreenNames: {
          skype: contact.imScreenNames?.skype || "",
          teams: contact.imScreenNames?.teams || "",
          whatsapp: contact.imScreenNames?.whatsapp || "",
          trillian: contact.imScreenNames?.trillian || "",
        },
        socialNetworking: {
          facebook: contact.socialNetworking?.facebook || "",
          twitter: contact.socialNetworking?.twitter || "",
          linkedin: contact.socialNetworking?.linkedin || "",
        },
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For nested fields like imScreenNames.skype
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(
        updateCompanyUserData({
          id: contact.id, // contact comes from useLocation().state.contact
          token,
          data: { plainData: form }, // Send form as plainData object
        })
      ).unwrap();

      if (result?.status === 200) {
        toast.success(result.message || "✅ Contact updated successfully!");
        setTimeout(() => navigate("/companyContacts"), 1500);
      } else {
        toast.error(result.message || "❌ Failed to update contact.");
      }
    } catch (error) {
      toast.error("❌ Error while updating contact. Please try again.");
      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  if (!contact) {
    return (
      <div className="p-4 text-red-600">No contact selected for editing.</div>
    );
  }

  return (
    <>
      <div className={css.profileLayout}>
        <form onSubmit={handleSubmit}>
          <div className={css.profileInfo}>
            <div className={css.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/mycompany"
                    end
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Primary Contact</span>
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
                  </li> */}
              </ul>
            </div>
            <div className={css.profileInfo_form}>
              <div
                className={`${css.profileInfo_form_personalInfo} font-thin text-left`}
              >
                <h1>Edit Contact </h1>
                <div className="pt-4 !text-left flex justify-start items-left">
                  <span>
                    <label htmlFor="firstName">Contact: First</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={handleChange}
                      value={form.firstName || ""}
                      placeholder="Your first name"
                    />
                  </span>
                  <span>
                    <label htmlFor="lastName">Contact: Last</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={handleChange}
                      value={form.lastName || ""}
                      placeholder="Your last name"
                    />
                  </span>
                  <span>
                    <label htmlFor="specialty">Contact: Title</label>
                    <input
                      type="text"
                      name="specialty"
                      id="specialty"
                      onChange={handleChange}
                      value={form.specialty || ""}
                      placeholder="title"
                    />
                  </span>
                  <span>
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      onChange={handleChange}
                      value={form.position || ""}
                      placeholder="Direct phone"
                    />
                  </span>
                  <span>
                    <label htmlFor="position">Speciality</label>
                    <input
                      type="text"
                      name="speciality"
                      id="speciality"
                      onChange={handleChange}
                      value={form.specialty || ""}
                      placeholder="speciality"
                    />
                  </span>
                  <span>
                    <label htmlFor="phoneNumber">Direct Phone</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleChange}
                      value={form.phoneNumber || ""}
                      placeholder="Direct phone"
                    />
                  </span>
                  <span>
                    <label htmlFor="tollFree">Toll Free</label>
                    <input
                      type="text"
                      name="tollFree"
                      id="tollFree"
                      onChange={handleChange}
                      value={form.tollFree || ""}
                      placeholder="tollFree"
                    />
                  </span>
                  <span>
                    <label htmlFor="cellular">Cellular</label>
                    <input
                      type="number"
                      name="cellular"
                      id="cellular"
                      onChange={handleChange}
                      value={form.cellular || ""}
                      placeholder="cellular"
                    />
                  </span>
                  <span>
                    <label htmlFor="faxNumber">Fax</label>
                    <input
                      type="number"
                      name="faxNumber"
                      id="faxNumber"
                      onChange={handleChange}
                      value={form.faxNumber || ""}
                      placeholder="fax"
                    />
                  </span>
                </div>
              </div>

              <div className={css.profileInfo_form_personalPhoto}>
                <div>
                  <h1>Company Logo</h1>
                  <div>
                    <img
                      src={form.profileImage}
                      alt="companyImage"
                      className="object-fit"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    onChange={handleFileChange}
                  />
                  <button type="submit">Submit Changes</button>
                </div>
              </div>

              <div className={`${css.profileInfo_form_IMScreenNames} pt-5`}>
                <h1>IM Screen Names</h1>
                <div className="!text-left">
                  {["skype", "teams", "whatsapp", "trillian"].map((im) => (
                    <span key={im}>
                      <div className="flex items-center justify-center">
                        <label htmlFor={im}>
                          {im.charAt(0).toUpperCase() + im.slice(1)}
                        </label>
                        <img
                          src={`https://ben.cachefly.net/images/social_networks/tiny_${im}.png`}
                          alt={im}
                          title={im}
                        />
                      </div>
                      <input
                        type="text"
                        name={`imScreenNames.${im}`}
                        id={im}
                        onChange={handleChange}
                        value={form.imScreenNames?.[im] || ""}
                        placeholder={`Enter ${im}`}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className={css.profileInfo_form_socialNetworking}>
                <h1>Social Networking</h1>
                <div className="!text-left">
                  {["facebook", "twitter", "linkedin"].map((sn) => (
                    <span key={sn}>
                      <div className="flex items-center justify-center">
                        <label htmlFor={sn}>
                          {sn.charAt(0).toUpperCase() + sn.slice(1)}
                        </label>
                        <img
                          src={`https://ben.cachefly.net/images/social_networks/tiny_${sn}.png`}
                          alt={sn}
                          title={sn}
                        />
                      </div>
                      <input
                        type="text"
                        name={`socialNetworking.${sn}`}
                        id={sn}
                        onChange={handleChange}
                        value={form.socialNetworking?.[sn] || ""}
                        placeholder={`${sn} profile`}
                      />
                    </span>
                  ))}
                  <div className="flex items-center justify-center p-10">
                    <p className="text-[8pt] text-[#444]">
                      (use the profile / url name, example 'brokercell' will
                      result in https://twitter.com/brokercell)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                className={`!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7 focus:border ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default UpdateCompanyUser;
