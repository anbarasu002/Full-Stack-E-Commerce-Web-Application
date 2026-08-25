import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaAndroid, FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">

      <div className="footerTop">
        <h3>SHOP BY CATEGORY</h3>

        <div className="categoryGrid">
          <ul>
            <li>Fashion</li>
            <li>Men Wear</li>
            <li>Women Wear</li>
            <li>Kids Wear</li>
            <li>Footwear</li>
          </ul>

          <ul>
            <li>Mobiles</li>
            <li>Smartphones</li>
            <li>Accessories</li>
            <li>Chargers</li>
            <li>Headphones</li>
          </ul>

          <ul>
            <li>Appliances</li>
            <li>Kitchen Items</li>
            <li>Home Essentials</li>
            <li>Electronics</li>
            <li>Smart Devices</li>
          </ul>

          <ul>
            <li>Sports</li>
            <li>Fitness</li>
            <li>Gym Equipment</li>
            <li>Outdoor</li>
            <li>Accessories</li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">

        <div className="follow-download">

          <div className="box">
            <h4>FOLLOW US</h4>
            <div className="socialIcons">
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
              <FaInstagram />
            </div>
          </div>

          <div className="box">
            <h4>DOWNLOAD APP</h4>
            <div className="appIcons">
              <FaAndroid />
              <FaApple />
            </div>
          </div>

        </div>

        <div>
          <h4>SHOP IT</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Blog</p>
          <p>Press</p>
        </div>

        <div>
          <h4>QUICK LINKS</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Return Policy</p>
          <p>Help Center</p>
        </div>

        <div>
          <h4>CONTACT US</h4>

          <p>📧 support@shopit.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Chennai, India</p>
        </div>

      </div>

      <div className="footerCopy">
        <p>© 2026 Shop It. All Rights Reserved</p>
      </div>

    </div>
  );
};

export default Footer;