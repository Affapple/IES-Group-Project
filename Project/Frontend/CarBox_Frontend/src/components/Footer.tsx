import React from 'react';
import './Footer.css';


const Footer: React.FC = () => {

  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__content">
                <a>Help Center</a>
            </div>
            <div className="footer__content">
                <a >Terms of Service</a>
            </div>
            <div className="footer__content">
                <a>Privacy Policy</a>
            </div>
        </div>
    
    </footer>
  );
};

export default Footer;