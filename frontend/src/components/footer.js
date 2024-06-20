import React from "react";
import '../css/layout.css'; // Ensure this path is correct
import '../css/Footer.css'; // Import your CSS for the footer
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@example.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Main St, Anytown, USA</p>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" className="_blank"><FaFacebook/></a>
              <a href="https://twitter.com" className="_blank"><FaTwitter/> </a>
              <a href="https://instagram.com" className="_blank"><FaInstagram /></a>
              <a href="https://linkedin.com" className="_blank"><FaLinkedin/></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
