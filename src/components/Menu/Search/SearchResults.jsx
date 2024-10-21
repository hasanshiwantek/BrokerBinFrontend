
import React from 'react';
import { Link } from 'react-router-dom';
import "./SearchResults.css";
import profileImg from "../../../assets/shadow.png";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {

    const results = useSelector((state) => state.profileStore);
    console.log(results);

    const location = useLocation(); 
    const { searchResults } = location.state; 

    return (
        <main>
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

            {searchResults.map((val, index) => (
                <div className="search-results-container" key={index}>
                    <div className="contact-info">

                        <div className='profile-image'>
                            <img src={profileImg} alt="profile-image" /> 
                            <p style={{textAlign:"center"}}><strong>{val.firstName} {val.lastName}</strong></p> 
                        </div>
                        <div className="profile-details">
                            <p><strong>Company:</strong> {val.company.name}</p>
                            <p><strong>Title:</strong> {val.position}</p>
                            <p><strong>Phone:</strong> {val.phoneNumber}</p>
                            <p><strong>Email:</strong> {val.email}</p>
                            <p><strong>City:</strong> {val.company.region}</p>
                            <p><strong>Country:</strong> {val.company.country}</p>
                        </div>

                        <div className="notes-rating"> 
                            <div className="notes">
                                <h3>My Notes:</h3>
                            </div>
                            <div className="rating">
                                <h3>My Rating:</h3>
                                <select>
                                    <option value="N/R">N/R</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default SearchResults;