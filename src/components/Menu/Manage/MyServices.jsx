import React from 'react'
import styles from "../../../styles/Menu/Tools/Tools.module.css"

const MyServices = () => {
  return (
    <>
    <div className="service-text" style={{textAlign:"center",marginTop:"30px"}}>
        <h1 style={{color:"red",fontWeight:"bold"}}>Admin Access Only</h1>
        <h1  style={{color:"red",fontWeight:"bold"}}>Non-admin users can still search the service directory. To search: <span  style={{color:"black",fontWeight:"bold"}}>Click here</span></h1>
 
    </div>
 
    </>
  )
}

export default MyServices;