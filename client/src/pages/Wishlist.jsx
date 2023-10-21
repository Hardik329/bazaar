import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Footer from "../components/footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Wishlist.css";
import { removeFromWishlist, setWishlist } from "../redux/wishlistSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Zoom from "react-reveal/Zoom";
import { makeRequest } from "../useFetch";
import { CDN_URL } from "../utils/constants";

const Wishlist = () => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const { userRequest } = makeRequest(currentUser?.accessToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchWishlist = async () => {
      // console.log("called fetchWishlist");
      try {
        const user = await userRequest.get(
          "/users/currentUser/" + currentUser.id
        );
        // console.log(user);
        dispatch(setWishlist(user.data.wishlist));
      } catch (error) {
        // console.log(error);
      }
    };

    currentUser && fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <Navbar />
      <Announcement />
      <div className="wishlist-wrapper">
        <h1 className="wishlist-title">WISHLIST</h1>
        <div className="wishlist-top">
          {wishlist.products.length > 0 && (
            <button
              className="wishlist-top-button"
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
          )}
          <div className="wishlist-top-texts">
            <span
              className="wishlist-top-text"
              onClick={() => navigate("/cart")}
            >
              Shopping Bag({cart.quantity})
            </span>
            <span
              className="wishlist-top-text"
              onClick={() => navigate("/wishlist")}
            >
              Your Wishlist({wishlist.products.length})
            </span>
          </div>
        </div>

        <div className="wishlist-bottom">
          <div className="wishlist-info">
            {wishlist.products.length === 0 && (
              <>
                <div className="empty-container">
                  <div className="empty-text">Your wishlist is empty!</div>
                  <button
                    className="wishlist-button"
                    style={{ width: "max-content", padding: "12px" }}
                    onClick={() => navigate("/")}
                  >
                    SHOP NOW
                  </button>
                </div>
              </>
            )}
            {wishlist.products?.map((product) => (
              <Zoom duration={500} key={product.id}>
                <div className="wishlist-product">
                  <div
                    className="wishlist-product-detail"
                    onClick={() => navigate("/product/" + product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="wishlist-image"
                      src={CDN_URL + "products/" + product.image_id + ".jpg"}
                      alt={product.title}
                    />
                    <div className="wishlist-details">
                      <span className="wishlist-product-name">
                        {product.title}
                      </span>
                    </div>
                  </div>
                  <div className="wishlist-price-detail">
                    <div className="product-amount-container">
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          dispatch(removeFromWishlist(product));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Zoom>
            ))}

            <hr className="hr" />
          </div>
          {/* </Zoom> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
