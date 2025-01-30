
import React, { useState } from 'react'
import "../../Main/MenuBar.css"
import { Link, useNavigate,NavLink  } from 'react-router-dom'
import styles from "../../../../styles/Menu/Search/Person.module.css"
import { submitUserSearch } from '../../../../ReduxStore/ProfleSlice'
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import CompanySearch from "../Inventory/CompanySearch";
import axios from "axios";


const SearchCompany = () => {
    const [loading, setLoading] = useState(false); // To track API call status
    const [buttonText, setButtonText] = useState("Submit");


    // State variables to track input values
    const [formData, setFormData] = useState({
        companyName: '',
        shieldMembers: 0,
        newMembers: 0,
        city: '',
        zip: '',
        country: '',
        region: '',
        areaCode: '',
        association: '',
        certification: '',
        manufacturer: '',
        products: '',
        categories: '',
        keywords: '',
    });

    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const navigate = useNavigate(); // Initialize useNavigate
    // Handle change in input/select fields
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Preserve other field values
            [name]: value // Update current field
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log("Form Data Submitted:", formData); // Check the values being sent
    //     setButtonText("Processing..."); // Set the button text to "Processing..."
    //     setLoading(true); // Start loading

    //     try {
    //         const result = await dispatch(submitUserSearch({ data: formData, token })).unwrap();

    //         console.log("API Result:", result);
    //         if (result.length === 0) {
    //             alert('No matching records found.');
    //             setFormData({
    //               companyName: '',
    //               shieldMembers: 0,
    //               newMembers: 0,
    //               city: '',
    //               zip: '',
    //               country: '',
    //               region: '',
    //               areaCode: '',
    //               association: '',
    //               certification: '',
    //               manufacturer: '',
    //               products: '',
    //               categories: '',
    //               keywords: '',
    //             });
    //         } else {
    //             navigate('/search/company-searchresults', { state: { searchResults: result } });
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user search data:', error);
    //         alert('An error occurred while fetching data.');
    //     } finally {
    //         setLoading(false); // End loading
    //         setButtonText("Submit"); // Reset the button text
    //     }
    // };

    const resetHandler = () => {
        setFormData({
          part: '',
          heci: '',
          description: '',
          manufacturer: '',
          keyword: '',
          condition: '',
          category: '',
          company: '',
          state: '',
          country: '',
          region: '',
          shipDeadline: '',
        });
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data Submitted:", formData);
        setButtonText("Processing...");
        setLoading(true);

        try {
            // Mock API Call - Replace with actual API URL
            const { data: result } = await axios.get(
                `http://localhost:5000/companies?companyName=${formData.companyName}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("API Result:", result);

            if (result.length === 0) {
                alert('No matching records found.');
                resetHandler();
            } else {
                navigate('/search/company-searchresults', { state: { searchResults: result } });
            }
        } catch (error) {
            console.error('Error fetching user search data:', error);
            alert('An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setButtonText("Submit");
        }
    };    

    return (
        <>
            <main className={styles.main}>
                       <div className={css.profileInfo_links}>
                           <ul className='!bg-[#e5e7eb]'>
                             <li>
                               <NavLink
                                 to="/search/Inventory"
                                 end  // This ensures the exact match for /myprofile
                                 className={({ isActive }) => (isActive ? css.active : '')}
                               >
                                 <span>Inventory</span>
                               </NavLink>
                             </li>
                             <li>
                               <NavLink
                                 to="/search/Company"
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

                <h2 style={{ margin: "15px" }}>Company Search</h2>
                <div className={styles.formContainer}>
                    <form className={`${styles.personForm} !gap-[.4vw]`} onSubmit={handleSubmit}>
                        <div className={`${styles.formRow}`}>
                        <span>
                          <CompanySearch className="flex" setFormData={setFormData} formData={formData} />
                        </span>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="shieldMembers">Shield Members</label>
                            <input
                                type="checkbox"
                                id="shieldMembers"
                                name="sheildMembers"
                                value={formData.shieldMembers}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="newMembers">New Members</label>
                            <input
                                type="checkbox"
                                id="newMembers"
                                name="newMembers"
                                value={formData.newMembers}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="state">State</label>
                            <select
                                name="state"
                                id="state"
                                value={formData.state}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="zip">Zip</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="Country">Country</label>
                            <select
                                name="country"
                                id="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>

                            </select>

                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="region">Region</label>
                            <select
                                name="region"
                                id="region"
                                value={formData.region}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                                <option value="NorthAmerica">North America</option>
                                <option value="SouthAmerica">South America</option>
                                <option value="Africa">Africa</option>
                                <option value="MiddleEast">Middle East</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                                <option value="Asia">Asia</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="areaCode">Area Code</label>
                            <input
                                type="text"
                                id="areaCode"
                                name="areaCode"
                                value={formData.areaCode}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="association">Association</label>
                            <select
                                name="association"
                                id="association"
                                value={formData.association}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="certification">Certification</label>
                            <select
                                name="certification"
                                id="certification"
                                value={formData.certification}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="manufacturer">Manufacturer</label>
                            <select
                                name="manufacturer"
                                id="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="products">Products</label>
                            <select
                                name="products"
                                id="products"
                                value={formData.products}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="categories">Categories</label>
                            <select
                                name="categories"
                                id="categories"
                                value={formData.categories}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                            </select>
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="keywords">Keywords</label>
                            <input
                                type="keywords"
                                id="keywords"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="submit"
                                disabled={loading} // Disable the button while processing
                                className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-4 text-white border rounded-lg ${loading ? "bg-[#2c83ec]" : "bg-[#2c83ec]"
                                    }`}
                            >
                                {buttonText}
                            </button>

                        </div>
                    </form>
                </div>
            </main>


        </>
    );
}

export default SearchCompany;
