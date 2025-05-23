import React from 'react'
import disableicon from "../../../assets/access-denied.png"
import "../../../components/Menu/Main/Badges.css"
import styles from "../../../styles/Menu/Tools/Tools.module.css"

const Search = () => {
  return (
    <>

      <div>

        <img src={disableicon} alt="" srcset="" style={{ margin: 'auto', marginTop: "50px" }} />
        <div style={{ margin: '20px' }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Disabled</h1>
          <hr style={{ border: "0.2px solid lightgray" }} />
          <p style={{ fontSize: "13px" }}>has been disabled. Please contact your Account Manager to take advantage of this great feature.</p>
        </div>

      </div>
      <div className='ctn'>
          <button className="contactButton">
            Contact <br /> Account Manager
          </button>
      </div>



    </>
  )
}

export default Search;
