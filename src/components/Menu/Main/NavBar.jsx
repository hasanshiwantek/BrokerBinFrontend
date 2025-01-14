import React from "react";
import "./NavBar.css"
const NavBar=()=>{
    return(
    <>

<header className="header">
<nav className="nav-bar">
    <ul>
        <li><a href="#email">Email</a></li>
        {/* <li><a href="#misc">Miscalleneous</a></li> */}
        <li><a href="#searching">Searching</a></li>
        <li><a href="#uploading">Uploading Parts</a></li>
        <li><a href="#broadcast">BroadCast</a></li>
        <li><a href="#profile">My Profile</a></li>
        <li><a href="#vendors">My Vendors</a></li>
        {/* <li><a href="#contacts">My Contacts</a></li> */}
        {/* <li><a href="#partcart">Part Cart</a></li> */}
        <li><a href="#hotlist">HotList</a></li>
    </ul>
</nav>

</header>

    </>
    )
}
export default NavBar;