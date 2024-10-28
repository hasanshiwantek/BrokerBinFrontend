import React from 'react'
import css from "./Footer.module.css"
const Footer = () => {
    return (
        <>
            <footer className={css.footerSec}>
                <a href="/">Advertising Programs</a>
                <a href="/">Business Solutions</a>
                <a href="/">About BrokerBin.com</a>
            </footer>
            <p className={css.p}>© 2024 Privacy</p>
        </>

    )
}

export default Footer