
import SendIcon from '@mui/icons-material/Send';
import './Newsletter.css'


const Newsletter = () => {
  return (
    <div className="news-container">
      <div className="news-title">Newsletter</div>
      <div className="news-desc">
        Get timely updates from your favorite products.
      </div>
      <div className="news-input-container">
        <input placeholder="your email" className="news-input" />
          <button aria-label='Send Newsletter' className='news-button'>
            <SendIcon />
          </button>
      </div>
    </div>
  );
};

export default Newsletter;
