import React from 'react';
import css from "./Footer.module.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={css.footerContainer}>
            <div className={css.footerLinks}>
                <a href="/">Advertising Programs</a>
                <a href="/">Business Solutions</a>
                <a href="https://brokercell.com/about/" target='_blank' rel="noopener noreferrer">About BrokerCell.com</a>
            </div>
            <div className={css.copyright}>
                © {year}  
                <a href="https://brokercell.com/privacy-policy/" target='_blank' rel="noopener noreferrer" className={css.privacyLink}>
                    Privacy
                </a>
            </div>
        </footer>
    );
};

export default Footer;
