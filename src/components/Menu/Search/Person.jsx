
import React, { useState } from 'react'
import "../Main/MenuBar.css"
import { Link, useNavigate } from 'react-router-dom'
import styles from "../../../styles/Menu/Search/Person.module.css"
import { submitUserSearch } from '../../../ReduxStore/ProfleSlice'
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'

const Person = () => {
    const [loading, setLoading] = useState(false); // To track API call status
    const [buttonText, setButtonText] = useState("Submit");


    // State variables to track input values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company_name: '',
        title: '',
        // specialty: '',
        state: '',
        region: '',
        email: ''
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

    // Handle form submission
    // const data=formData
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Form Data Submitted:", data);
    //     dispatch(submitUserSearch({data,token}))
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Form Data Submitted:", formData); // Check the values being sent
        setButtonText("Processing..."); // Set the button text to "Processing..."
        setLoading(true); // Start loading

        try {
            const result = await dispatch(submitUserSearch({ data: formData, token })).unwrap();

            console.log("API Result:", result);
            if (result.length === 0) {
                alert('No matching records found.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    company_name: '',
                    title: '',
                    state: '',
                    region: '',
                    email: ''
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
            <main className={styles.main}>
                <nav className='menu-bar'>
                    <ul>
                        <li><Link to={'/inventory'}>Inventory</Link></li>
                        <li><Link to={'/searchcompany'}>Company</Link></li>
                        <li><Link to={'/person'}>Person</Link></li>
                        <li><Link to={"/"}>TechSpecs</Link></li>
                        <li><Link to={'/'}>NSN</Link></li>
                        <li><Link to={'/'}>Alt#</Link></li>
                    </ul>
                </nav>

                {/* Form Section */}
                <h2 style={{ margin: "15px" }}>Person Search</h2>
                <div className={styles.formContainer}>
                    <form className={styles.personForm} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="company_name">Company</label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* <div className={styles.formRow}>
                            <label htmlFor="specialty">Specialty</label>
                            <input
                                type="text"
                                id="specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleInputChange}
                            />
                        </div> */}

                        <div className={styles.formRow}>
                            <label htmlFor="state">State</label>
                            <select
                                name="state"
                                id="state"
                                value={formData.state}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                                <option value="AL">ALABAMA</option>
                                <option value="AK">ALASKA</option>
                                <option value="AZ">ARIZONA </option>
                                <option value="AR">ARKANSAS </option>
                                <option value="CA">CALIFORNIA </option>
                                <option value="CO">COLORADO </option>
                                <option value="CT">CONNECTICUT </option>
                                <option value="DE">DELAWARE </option>
                                <option value="DC">DISTRICT OF COLUMBIA </option>
                                <option value="FL">FLORIDA </option>
                                <option value="GA">GEORGIA </option>
                                <option value="HI">HAWAII </option>
                                <option value="ID">IDAHO </option>
                                <option value="IL">ILLINOIS </option>
                                <option value="IN">INDIANA </option>
                                <option value="IA">IOWA </option>
                                <option value="KS">KANSAS </option>/
                                <option value="KY">KENTUCKY </option>
                                <option value="LA">LOUISIANA </option>
                                <option value="ME">MAINE </option>
                                <option value="MD">MARYLAND </option>
                                <option value="MA">MASSACHUSETTS </option>
                                <option value="MI">MICHIGAN </option>
                                <option value="MN">MINNESOTA </option>
                                <option value="MS">MISSISSIPPI </option>
                                <option value="MO">MISSOURI </option>
                                <option value="MT">MONTANA </option>
                                <option value="NE">NEBRASKA </option>
                                <option value="NV">NEVADA </option>
                                <option value="NH">NEW HAMPSHIRE </option>
                                <option value="NJ">NEW JERSEY </option>
                                <option value="NM">NEW MEXICO </option>
                                <option value="NY">NEW YORK </option>
                                <option value="NC">NORTH CAROLINA </option>
                                <option value="ND">NORTH DAKOTA </option>


                                <option value="OH">OHIO </option>
                                <option value="OK">OKLAHOMA </option>
                                <option value="OR">OREGON </option>
                                <option value="PA">PENNSYLVANIA </option>
                                <option value="PR">PUERTO RICO </option>
                                <option value="RI">RHODE ISLAND </option>
                                <option value="SC">SOUTH CAROLINA </option>
                                <option value="SD">SOUTH DAKOTA </option>
                                <option value="TN">TENNESSEE </option>
                                <option value="TX">TEXAS </option>
                                <option value="UT">UTAH </option>
                                <option value="VT">VERMONT </option>
                                <option value="VA">VIRGINIA </option>
                                <option value="WA">WASHINGTON </option>
                                <option value="WV">WEST VIRGINIA </option>
                                <option value="WI">WISCONSIN </option>
                                <option value="WY">WYOMING </option>
                                <option>-------- </option>
                                <option value="AB">ALBERTA </option>
                                <option value="BC">BRITISH COLUMBIA </option>
                                <option value="MB">MANITOBA </option>
                                <option value="NB">NEW BRUNSWICK </option>
                                <option value="NF">NEWFOUNDLAND </option>
                                <option value="NT">NORTHWEST TERRITORIES </option>
                                <option value="NS">NOVA SCOTIA </option>
                                <option value="NU">NUNAVUT </option>
                                <option value="ON">ONTARIO </option>
                                <option value="PE">PRINCE EDWARD ISLAND </option>
                                <option value="QC">QUEBEC </option>
                                <option value="SK">SASKATCHEWAN </option>
                                <option value="YT">YUKON TERRITORY </option>

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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="submit"
                                disabled={loading} // Disable the button while processing
                                className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-4 text-white border rounded-lg ${loading ? "bg-orange-600" : "bg-orange-600"
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

export default Person;
