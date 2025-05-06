import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { brokerAPI } from '../../../api/BrokerEndpoint';
import Cookies from "js-cookie";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



// Define the AsyncThunk
export const createUser = createAsyncThunk('createUser', async (formData, { rejectWithValue }) => {
    try {

        const token = Cookies.get('token');
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const response = await fetch(`${brokerAPI}user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Get error message from backend
            throw new Error(errorMessage || 'Failed to create account');
        }

        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        userId: '',
        lastName: '',
        firstName: '',
        position: '',
        specialty: '',
        phoneNumber: '',
        tollFree: '',
        cellular: '',
        faxNumber: '',
        security: 'Browse Only',
        email: '',
        imScreenNames: {
            skype: '',
            whatsapp: '',
            trillian: '',
        },
        socialNetworking: {
            facebook: '',
            linkedin: '',
        },
        password: '',
        retypePassword: '',
        preferredUse: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
            // For `imScreenNames` nested updates
            if (['skype', 'whatsapp', 'trillian'].includes(name)) {
                return {
                    ...prevFormData,
                    imScreenNames: {
                        ...prevFormData.imScreenNames,
                        [name]: value,
                    },
                };
            }
            // For `socialNetworking` nested updates
            if (['facebook', 'linkedin'].includes(name)) {
                return {
                    ...prevFormData,
                    socialNetworking: {
                        ...prevFormData.socialNetworking,
                        [name]: value,
                    },
                };
            }
            // For non-nested updates
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };



    const handleSubmit = async () => {
        if (formData.password !== formData.retypePassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const result = await dispatch(createUser(formData));
            if (createUser.fulfilled.match(result)) {
                // alert('Account created successfully!');
                // ✅ Show success toast with light blue color
                toast.info("Account Created Successfully", {
                    style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, // 
                });
                // Reset formData to initial values
                setFormData({
                    userId: '',
                    lastName: '',
                    firstName: '',
                    position: '',
                    specialty: '',
                    phoneNumber: '',
                    tollFree: '',
                    cellular: '',
                    faxNumber: '',
                    security: 'Browse Only',
                    email: '',
                    imScreenNames: {
                        skype: '',
                        whatsapp: '',
                        trillian: '',
                    },
                    socialNetworking: {
                        facebook: '',
                        linkedin: '',
                    },
                    password: '',
                    retypePassword: '',
                    preferredUse: ''
                });
                console.log(result.payload);
            } else {
                alert(`Error creating account: ${result.payload}`);
            }
        } catch (error) {
            // alert('Unexpected error occurred!');
            toast.error(error || "Error Creating Account.Please Try Again.", {
                style: { fontSize: "12px", marginTop: "-10px", fontWeight: "bold" }, // 
            });

            console.error(error);
        }
    };

    return (
        <div className={`px-5 ${css.profileLayout} `}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={`${css.profileInfo} !bg-white  border-2 rounded-2xl`}>

                    <div className={css.profileInfo_links}>
                        <ul className='bg-gray-200'>
                            <li>
                                <NavLink
                                    to="/mycompany"
                                    // end  
                                    className={({ isActive }) => (isActive ? css.active : '')}
                                >
                                    <span>Primary Contact</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/mycompany/Createaccount"
                                    className={({ isActive }) => (isActive ? css.active : '')}
                                >
                                    <span>Create Account</span>
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
                            <li>
                                <NavLink
                                    to="/myprofile/MyVendors"
                                    className={({ isActive }) => (isActive ? css.active : '')}
                                >
                                    <span>My Vendors</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/myprofile/MyContact"
                                    className={({ isActive }) => (isActive ? css.active : '')}
                                >
                                    <span>My Contacts</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/myprofile/broadcastfilter"
                                    className={({ isActive }) => (isActive ? css.active : '')}
                                >
                                    <span>Broadcast Filters</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <h1 className='pt-5'>Create Account</h1>

                    <div className='!flex !justify-between !space-x-[4vw] !pt-10'>

                        <div className='!flex !flex-col !text-right !gap-5'>

                            <span className='space-x-4'>
                                <label>Login</label>
                                <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
                            </span>

                            <span className='space-x-4'>
                                <label>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </span>


                            <span className='space-x-4'>
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </span>


                            <span className='space-x-4'>
                                <label>Position</label>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Specialty (if any)</label>
                                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Direct Number</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Toll Free</label>
                                <input type="text" name="tollFree" value={formData.tollFree} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Cellular</label>
                                <input type="text" name="cellular" value={formData.cellular} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Fax</label>
                                <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <label>Security</label>
                                <select name="security" value={formData.security} onChange={handleChange}>
                                    <option value="Browse Only">Browse Only</option>
                                    <option value="Full Access">Full Access</option>
                                </select>
                            </span>

                            <span className='space-x-4'>
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </span>

                            <span className='space-x-4'>
                                <label>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </span>

                            <span className='space-x-4'>
                                <label>Re-Type Password</label>
                                <input type="password" name="retypePassword" value={formData.retypePassword} onChange={handleChange} required />
                            </span>
                        </div>

                        <div className='flex flex-col text-right gap-5'>
                            <h3>IM Screen Names</h3>

                            <span className='space-x-4'>
                                <div className='flex items-center'>
                                    <label>Skype</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_skype.png" alt="Skype" title="Skype"></img>
                                </div>

                                <input type="text" name="skype" value={formData.imScreenNames.skype} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <div className="flex items-center ">
                                    <label htmlFor="whatsapp">WhatsApp</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png" alt="WhatsApp" title="WhatsApp" />
                                </div>
                                <input type="text" name="whatsapp" value={formData.imScreenNames.whatsapp} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <div className="flex items-center">
                                    <label htmlFor="trillian">Trillian</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png" alt="Trillian" title="Trillian" />
                                </div>
                                <input type="text" name="trillian" value={formData.imScreenNames.trillian} onChange={handleChange} />
                            </span>

                            <h3>Social Networking</h3>

                            <span className='space-x-4'>
                                <div className="flex items-center">
                                    <label htmlFor="facebook">Facebook</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png" alt="Facebook" title="Facebook" />
                                </div>
                                <input type="text" name="facebook" value={formData.socialNetworking.facebook || ''} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <div className="flex items-center">
                                    <label htmlFor="twitter">Twitter</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png" alt="Twitter" title="Twitter" />
                                </div>
                                <input type="text" name="twitter" value={formData.socialNetworking.twitter} onChange={handleChange} />
                            </span>

                            <span className='space-x-4'>
                                <div className="flex items-center">
                                    <label htmlFor="linkedin">LinkedIn</label>
                                    <img src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png" alt="Linked-In" title="Linked-In" />
                                </div>
                                <input type="text" name="linkedin" value={formData.socialNetworking.linkedin} onChange={handleChange} />
                            </span>

                            <h3>Password Requirements</h3>


                            <h3>Preferred Brokercell Use</h3>
                            <label><input type="radio" name="preferredUse" value="Telecom" onChange={handleChange} /> Telecom</label>
                            <label><input type="radio" name="preferredUse" value="Computer" onChange={handleChange} /> Computer</label>
                        </div>

                    </div>

                    <button type="button" onClick={handleSubmit}
                        className='bg-[#2c83ec] rounded-lg  px-12 !h-16 !mt-5'>Save</button>
                </div>


            </form>
        </div>
    );

};

export default CreateAccount;
