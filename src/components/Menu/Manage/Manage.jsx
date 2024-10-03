import React from 'react'
import disableicon from "../../../assets/access-denied.png"
import "../../../components/Menu/Main/Badges.css"
import styles from "../../../styles/Menu/Tools/Tools.module.css"

const Manage = () => {
  return (
    <>

      <div>

        <img src={disableicon} alt="" srcset="" style={{ margin: 'auto', marginTop: "50px" }} />
        <div style={{ margin: '20px' }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Administrators Only</h1>
          <hr style={{ border: "0.2px solid lightgray" }} />
          <p style={{ fontSize: "13px" }}>Please contact your Account Manager to upgrade your access.
         </p>
        </div>

      </div>
      <div className='ctn'>
          <button className="contactButton">
            Contact <br /> Account Manager
          </button>
      </div>


<footer>
<div className={styles.footerlinks} style={{marginTop:"12px"}}>
        <li><a href="/">Advertising Programs</a></li>
        <li><a href="/">Business Solutions</a></li>
        <li><a href="/">About BrokerBin.com</a></li>
        <li>©2024 Privacy</li>
    </div>
</footer>

    </>
  )
}

export default Manage
