
import './Help.css'
import BroadCast from './BroadCast';
import Contacts from './Contacts';
import Email from './Email';
import FeedBack from './FeedBack';
import HotList from './HotList';
import Icons from './Icons';
import MenuBar from './MenuBar';
import Miscalleneous from './Miscalleneous';
import MultiCast from './MultiCast';
import NavBar from './NavBar';
import PartCart from './PartCart';
import Profile from './Profile';
import QuickLinks from './QuickLinks';
import Reports from './Reports';
import Searching from './Searching';
import SiteAllowances from './SiteAllowances';
import SiteColors from './SiteColors';
// import Table from './Components/Table';
// import Tools from './Components/Tools';
import UploadingParts from './UploadingParts';
import Vendors from './Vendors';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter here

function Help() {
  return (
    // <Router> 
    <>
      <main className='main'>
        <NavBar />
        <MenuBar />
        <QuickLinks />
        <BroadCast />
        <SiteColors />
        <SiteAllowances />
        <Icons />
        <Reports />
        <Email />
        <Miscalleneous />
        <Searching />
        <UploadingParts />
        <MultiCast />
        <Profile />
        <Vendors />
        <Contacts />
        <PartCart />
        <HotList />
        <FeedBack />
      </main>
         <footer>
         <div className="footerlinks">
             <li><a href="/">Advertising Programs</a></li>
             <li><a href="/">Business Solutions</a></li>
             <li><a href="/">About BrokerBin.com</a></li>
             <li>©2024 Privacy</li>
         </div>
     </footer>
    </>


    // </Router>
  );
}

export default Help;












