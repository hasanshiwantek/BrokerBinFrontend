import React from 'react'
import css from "./Footer.module.css"

const Footer = () => {

    const year=new Date().getFullYear();


    return (
        <>
            <footer className={css.footerSec}>
                <a href="/">Advertising Programs</a>
                <a href="/">Business Solutions</a>
                <a href="/">About BrokerCell.com</a>
            </footer>
            <p className={css.p}>© {year} Privacy</p>
        </>

    )
}

export default Footer;