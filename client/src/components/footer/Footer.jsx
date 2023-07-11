import "./Footer.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <h1>BAZAAR</h1>
        <div className="footer-desc">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </div>
        <div className="social-container">
          <div className="social-icon" style={{ color: "#3B5999" }}>
            <FacebookIcon />
          </div>
          <div className="social-icon" style={{ color: "#E4405F" }}>
            <InstagramIcon />
          </div>
          <div className="social-icon" style={{ color: "#55ACEE" }}>
            <TwitterIcon />
          </div>
          <div className="social-icon" style={{ color: "#E60023" }}>
            <PinterestIcon />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <div className="footer-title">Useful Links</div>
        <ul className="footer-list">
          <div className="footer-list-left">
            <li className="footer-list-item">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li className="footer-list-item">
              <Link
                to="/cart"
                style={{ color: "black", textDecoration: "none" }}
              >
                Cart
              </Link>
            </li>
            <li className="footer-list-item">
              <Link
                to="/products/men"
                style={{ color: "black", textDecoration: "none" }}
              >
                Men Fashion
              </Link>
            </li>
            <li className="footer-list-item">
              <Link
                to="/products/women"
                style={{ color: "black", textDecoration: "none" }}
              >
                Women Fashion
              </Link>
            </li>
            <li className="footer-list-item">
              <Link
                to="/products/accessories"
                style={{ color: "black", textDecoration: "none" }}
              >
                Accessories
              </Link>
            </li>
          </div>
          <div className="footer-list-right">
            <li className="footer-list-item">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                My Account
              </Link>
            </li>
            <li className="footer-list-item">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Order Tracking
              </Link>
            </li>
            <li className="footer-list-item">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Wishlist
              </Link>
            </li>
            <li className="footer-list-item">
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Terms and Conditions
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="footer-right">
        <div className="footer-title">Contact</div>
        <div className="contact-item">
          <LocationOnIcon style={{ marginRight: "10px" }} /> 187 White House
        </div>
        <div className="contact-item">
          <PhoneIcon style={{ marginRight: "10px" }} /> +91 1234567890
        </div>
        <div className="contact-item">
          <EmailOutlinedIcon style={{ marginRight: "10px" }} /> hardik@gmail.com
        </div>
        <img
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
          className="payment"
        />
      </div>
    </div>
  );
};

export default Footer;
