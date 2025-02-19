import React from 'react'
import "../../Menu/Main/MenuBar.css"
import { Link } from 'react-router-dom'
import styles from "../../../styles/Menu/Reports/ServiceStats.module.css"

const ServiceStats = () => {
    return (
        <>
              <main className={styles.main}>
      <nav className={styles.nav}>
        <ul>
          <li><Link to={'/services'}>Service Directory Links</Link></li>
          <li><Link to={'/manage/my-services'}>Manage my Services</Link></li>
          <li><Link to={'/reports/serviceStats'}>Service Directory Stats</Link></li>
        </ul>
      </nav>
      <div className={styles.container}>
        <h2 className={styles.title}>Service Directory Stats</h2>
        <hr />
        <p className={styles.subtitle}>In the last 365 days, your company has received...</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>DIRECTORY SEARCHES</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>FOCUSES</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>HOVERS</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>PROFILE VIEWS</span>
          </div>
        </div>
        <p className={styles.subtitle}>Performed by...</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>USERS</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>STATES/PROVINCES</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>COUNTRIES</span>
          </div>
        </div>
      </div>
    </main>


        </>
    )
}

export default ServiceStats;