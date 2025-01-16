import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link,NavLink, useNavigate } from "react-router-dom";
import styles from "../../../../styles/Menu/Search/Person.module.css"




const CompanySearch = () => {

    const [loading, setLoading] = useState(false); // To track API call status
    const [buttonText, setButtonText] = useState("Submit");
    
    const [formData, setFormData] = useState({
            companyName: '',
            shieldMembers: '',
            newMembers: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            region: '',
            areaCode: '',
            shipDeadline: '',
            association: '',
            certification: '',
            manufacturer: '',
            products: '',
            categories: '',
            keywords: '',
        });

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Preserve other field values
            [name]: value // Update current field
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Form Data Submitted:", formData); // Check the values being sent
            // setButtonText("Processing..."); // Set the button text to "Processing..."
            setLoading(true); // Start loading
    
            try {
                const result = await dispatch(submitUserSearch({ data: formData, token })).unwrap();
    
                console.log("API Result:", result);
                if (result.length === 0) {
                    alert('No matching records found.');
                    setFormData({
                        companyName: '',
                        shieldMembers: '',
                        newMembers: '',
                        city: '',
                        state: '',
                        zip: '',
                        country: '',
                        region: '',
                        areaCode: '',
                        shipDeadline: '',
                        association: '',
                        certification: '',
                        manufacturer: '',
                        products: '',
                        categories: '',
                        keywords: '',
                    });
                } else {
                    navigate('/search-result', { state: { searchResults: result } });
                }
            } catch (error) {
                console.error('Error fetching user search data:', error);
                alert('An error occurred while fetching data.');
            } finally {
                setLoading(false); // End loading
                setButtonText("Submit"); // Reset the button text
            }
        };

  return (
    <>
        <div className={css.profileLayout}>
          <form onSubmit={handleSubmit}>
            <div className={css.profileInfo}>
              <div className={css.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/advance"
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Inventory</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Options</span>
                  </NavLink>
                </li> */}
                {/* <li>
                  <NavLink
                    to="/myprofile/MyVendors"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>My Vendors</span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/advance/Company"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Company</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/person"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Person</span>
                  </NavLink>
                </li>
              </ul>
              </div>

              <div className={css.profileInfo_form}>
              <h2 style={{ margin: "" }}>Inventory Search</h2>
                <div className={css.profileInfo_form_personalInfo}>
                  <div>
                    <span>
                      <label htmlFor="part">Part#</label>
                      <input
                        type="text"
                        name="part"
                        id="firstName"
                        onChange={handleChange}
                        value={formData.part}
                      />
                    </span>
                    <span>
                      <label htmlFor="heci">HECI</label>
                      <input
                        type="text"
                        name="heci"
                        id="lastName"
                        onChange={handleChange}
                        value={formData.heci}
                      />
                    </span>
                    <span>
                      <label htmlFor="Description">Description</label>
                      <input
                        type="text"
                        name="description"
                        id="position"
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </span>
                    <span>
                      <label htmlFor="manufacturer">Manufacturer</label>
                      <input
                        type="text"
                        name="manufacturer"
                        id="specialty"
                        onChange={handleChange}
                        value={formData.manufacturer}
                      />
                    </span>
                    <div className="flex flex-col">
                        <h1>Keyword Searches</h1>
                            <span>
                            <label htmlFor="partHeci">Part #/HECI</label>
                            <input
                                type="text"
                                name="partHeci"
                                id="email"
                                onChange={handleChange}
                                value={formData.partHeci}
                            />
                            </span>
                            <span>
                            <label htmlFor="keyword">Keyword</label>
                            <input
                                type="text"
                                name="keyword"
                                id="email"
                                onChange={handleChange}
                                value={formData.keyword}
                            />
                            </span>
                    </div>
                    <div className={''}>
                        <label htmlFor="condition">Condition</label>
                        <select
                            name="condition"
                            id="region"
                            value={formData.condition}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="NorthAmerica">NEW</option>
                            <option value="SouthAmerica">ASIS</option>
                            <option value="Africa">EXC</option>
                            <option value="MiddleEast">F/S</option>
                            <option value="Europe">NOB</option>
                            <option value="Oceania">REF</option>
                            <option value="Asia">OEMREF</option>
                            <option value="Asia">REP</option>
                            <option value="Asia">USED</option>
                        </select>
                    </div>
                    <span>
                      <label htmlFor="category">Category</label>
                      <input
                        type="text"
                        name="category"
                        id="specialty"
                        onChange={handleChange}
                        value={formData.category}
                      />
                    </span>
                    <span>
                      <label htmlFor="Company">Company</label>
                      <input
                        type="text"
                        name="company"
                        id="specialty"
                        onChange={handleChange}
                        value={formData.company}
                      />
                    </span>
                    <span className={''}>
                        <label htmlFor="State">State</label>
                        <select
                                name="state"
                                id="region"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value="">All</option>
                        </select>
                    <label htmlFor="Country">Country</label>
                    <select
                            name="country"
                            id="region"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                    </select>
                    <label htmlFor="Region">Region</label>
                    <select
                            name="region"
                            id="region"
                            value={formData.region}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                    </select>
                    <div className="Ship Deadline">
                    <label htmlFor="ShipDeadline">ShipDeadline</label>
                    <select
                            name="ShipDeadline"
                            id="region"
                            value={formData.Region}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                    </select>
                    <select
                            name="shipDeadline"
                            id="region"
                            value={formData.Region}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                    </select>
                    </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="text-white bg-[#f06622]">Reset</button>
                <button className="text-white bg-[#f06622]">Submit</button>
              </div>
            </div>
          </form>
        </div>
    </>
  );
};

export default CompanySearch;