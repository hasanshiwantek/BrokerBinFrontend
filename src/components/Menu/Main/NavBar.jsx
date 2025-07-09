import React from "react";
import "./NavBar.css"
const NavBar=()=>{
    return(
    <>

<header className="header fixed left-0 right-0">
<nav className="nav-bar">
    <ul>
        <li><a href="#reports">Email</a></li>
        {/* <li><a href="#misc">Miscalleneous</a></li> */}
        <li><a href="#email">Searching</a></li>
        <li><a href="#uploading">Uploading Parts</a></li>
        <li><a href="#quicklinks">BroadCast</a></li>
        <li><a href="#multicast">My Profile</a></li>
        <li><a href="#profile">My Vendors</a></li>
        {/* <li><a href="#contacts">My Contacts</a></li> */}
        <li><a href="#partcart">Part Cart</a></li>
        <li><a href="#hotlist">HotList</a></li>
    </ul>
</nav>

</header>

    </>
    )
}
export default NavBar;