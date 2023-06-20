
import './Footer.css'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';


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
          <div className="social-icon" style={{color:"#3B5999"}}>
            <FacebookIcon />
          </div>
          <div className="social-icon" style={{color:"#E4405F"}}>
            <InstagramIcon />
          </div>
          <div className="social-icon" style={{color:"#55ACEE"}} >
            <TwitterIcon />
          </div>
          <div className="social-icon" style={{color:"#E60023"}}>
            <PinterestIcon />
          </div>
        </div>
      </div>
      <div className="footer-center">
        <div className="footer-title">Useful Links</div>
        <ul className="footer-list">
          <li className="footer-list-item">Home</li>
          <li className="footer-list-item">Cart</li>
          <li className="footer-list-item">Man Fashion</li>
          <li className="footer-list-item">Woman Fashion</li>
          <li className="footer-list-item">Accessories</li>
          <li className="footer-list-item">My Account</li>
          <li className="footer-list-item">Order Tracking</li>
          <li className="footer-list-item">Wishlist</li>
          <li className="footer-list-item">Terms</li>
        </ul>
      </div>
      <div className="footer-right">
        <div className="footer-title">Contact</div>
        <div className="contact-item">
          <LocationOnIcon style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
        </div>
        <div className="contact-item">
          <PhoneIcon style={{marginRight:"10px"}}/> +1 234 56 78
        </div>
        <div className="contact-item">
          <EmailOutlinedIcon style={{marginRight:"10px"}} /> contact@lama.dev
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" className='payment'/>

      </div>
    </div>
  );
};

export default Footer;
