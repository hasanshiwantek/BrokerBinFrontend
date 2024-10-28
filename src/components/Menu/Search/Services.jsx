import React from 'react'
import styles from "../../../styles/Menu/Search/Services.module.css"

const Services = () => {

    const services = [
        { category: "Asset Recovery", companies: ["Procurri Europe Lifecycle Services", "thomastech"], count: 18 },
        { category: "Backup", companies: ["Netware Systems Pvt Ltd"], count: 3 },
        { category: "Call Center", companies: [], count: 2 },
        { category: "Cloud Migration", companies: ["Procurri Europe Lifecycle Services"], count: 2 },
        { category: "Cloud Services", companies: ["Netware Systems Pvt Ltd"], count: 2 },
        { category: "Conferencing", companies: ["Netware Systems Pvt Ltd"], count: 1 },
        { category: "Data Destruction", companies: ["Procurri Europe Lifecycle Services", "Top Gun Technology"], count: 12 },
        { category: "Data Recovery", companies: ["Procurri Europe Lifecycle Services"], count: 3 },
        { category: "Deinstallation", companies: ["Procurri Europe Lifecycle Services", "Top Gun Technology"], count: 10 },
        { category: "Delivery Duty Paid", companies: [], count: 1 },
        { category: "Disaster Recovery", companies: ["Procurri Europe Lifecycle Services", "Base IT Ltd", "thomastech"], count: 7 },
        { category: "DaaS", companies: [], count: 1 },
        { category: "Engineering", companies: [], count: 4 },
        { category: "Fiber", companies: ["Netware Systems Pvt Ltd"], count: 3 },
        { category: "Hardware Audits", companies: ["Procurri Europe Lifecycle Services"], count: 7 },
        { category: "Hosting", companies: [], count: 1 },
        { category: "IaaS", companies: ["Procurri Europe Lifecycle Services"], count: 2 },
        { category: "Import / Export", companies: [], count: 2 },
        { category: "Import / Export of Record", companies: [], count: 1 },
        { category: "Installation", companies: ["Procurri Europe Lifecycle Services"], count: 10 },
        { category: "Internet", companies: [], count: 1 },
        { category: "Inventory Management", companies: ["CloudCover", "TragSys"], count: 7 },
        { category: "IT Management", companies: ["CloudCover"], count: 4 },
        { category: "ITAD", companies: ["Procurri Europe Lifecycle Services", "Flex IT Distribution"], count: 22 },
        { category: "Leasing", companies: [], count: 1 },
        { category: "Logistics", companies: ["CloudCover", "TecEx"], count: 6 },
        { category: "Maintenance", companies: ["thomastech", "Top Gun Technology"], count: 10 },
        { category: "Managed Services", companies: ["Base IT Ltd", "Netware Systems Pvt Ltd", "CloudCover"], count: 9 },
        { category: "Network Management", companies: ["Base IT Ltd", "OSI Hardware Inc", "CloudCover"], count: 9 },
        { category: "Networking", companies: ["thomastech"], count: 17 },
        { category: "Packaging", companies: [], count: 2 },
        { category: "Recycling / Scrap", companies: ["thomastech", "Top Gun Technology"], count: 20 },
        { category: "Rental", companies: ["Flex IT Distribution", "Netware Systems Pvt Ltd", "CloudCover"], count: 8 },
        { category: "Repair", companies: [], count: 7 },
        { category: "Security", companies: ["Netware Systems Pvt Ltd"], count: 1 },
        { category: "Shipping", companies: ["CloudCover", "TecEx"], count: 2 },
        { category: "Software", companies: ["Netware Systems Pvt Ltd"], count: 3 },
        { category: "Sort and Settle", companies: [], count: 1 },
        { category: "Solutions", companies: ["Procurri Europe Lifecycle Services", "thomastech"], count: 16 },
        { category: "Storage", companies: ["Procurri Europe Lifecycle Services", "thomastech", "Netware Systems Pvt Ltd", "CloudCover"], count: 7 },
        { category: "Testing Facility", companies: ["thomastech"], count: 14 },
        { category: "VoIP", companies: ["OSI Hardware Inc"], count: 2 },
        { category: "WAN / MPLS", companies: ["OSI Hardware Inc", "Netware Systems Pvt Ltd"], count: 4 },
      ];




  return (
    <>

<div className={styles.headSection}>
  <h1> <a href="#members">Services for Members (265)  </a></h1>
  <h1> <a href="#resale">Services for Resale (14) </a></h1>


</div>

     <div className={styles.servicesContainer} id='members'>
      <h2>Services for Members</h2>
      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceItem}>
            <h3>{service.category} ({service.count})</h3>
            <ul>
              {service.companies.length > 0 ? (
                service.companies.map((company, i) => (
                  <li key={i}>{company}</li>
                ))
              ) : (
                <li>No companies listed</li>
              )}
            </ul>
          </div>
        ))}
      </div>

    </div>

    <div className={styles.secondContainer} id='resale'>
<h2 className={styles.head}>Services for Resale</h2>
<div className={styles.memberSec}>
<div className={styles.memberSec1}>
  <h2 style={{fontSize:'25px'}}>Up Front Bonus</h2>
  <li>Asset Recovery (3)</li>
  <li>ITAD (2)</li>
  <li>Managed Service (1)</li>
  <p>CloudCover</p>
  <li>Networking (1)</li>
  <li>Recycling / Scrap (1)</li>
  <li>Repair (1)</li>
  <li>Storage (1)</li>
  <li>Testing Facility (1)</li>
  </div>



<div >
  <h2 style={{fontSize:'25px'}}>Recurring Bonus</h2>
  <li>Data Destruction (1)</li>
  <li>Maintenance (1)</li>
  <p>Cloud Cover</p>
  <li>Managed Services (1)</li>
</div>
</div>

    </div>



    </>
  )
}

export default Services















