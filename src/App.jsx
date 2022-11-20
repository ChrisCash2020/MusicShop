import Artist from "./components/Artist";
import "./App.css";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Product from "./components/Product";
import Shop from "./components/Shop";
import cartLogo from "./assets/shopping-bag.png";
import searchIcon from "./assets/search1.png";
import closeIcon from "./assets/close.png";
import closeDarkIcon from "./assets/close-dark.png";
import cartBigLogo from "./assets/big-shopping-bag.png";
import { useState } from "react";
import CartItem from "./components/CartItem";
export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchClose, setSearchClose] = useState(false);
  const [artist, setArtist] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);
  function handleChange(event) {
    const { value } = event.target;
    setArtist(value);
  }

  function handleSearch(e) {
    const tag = e.target.tagName;
    if (tag === "IMG") setArtist("");
    const queryContainer = document.querySelector(".query-container");
    if (searchClose) {
      queryContainer.style.display = "none";
      setSearchClose(false);
    } else {
      queryContainer.style.display = "flex";
      setSearchClose(true);
    }
  }
  function handleCart() {
    const cartContainer = document.querySelector(".cart");
    if (cartContainer.style.display == "block") {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "block";
    }
  }
  function getSubTotal() {
    var arr = shoppingCart.map((item) => item.score);
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum * 19.99;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/${e.target.value}`);
    const queryContainer = document.querySelector(".query-container");
    if (searchClose) {
      queryContainer.style.display = "none";
      setSearchClose(false);
    } else {
      queryContainer.style.display = "flex";
      setSearchClose(true);
    }
    setArtist("");
  };
  return (
    <>
      <div className="query-container">
        <div className="query-form">
          <img
            onClick={handleSearch}
            className="close-search logo"
            src={closeIcon}
            alt="Close Button"
          />
          <input
            onKeyPress={(e) => e.key == "Enter" && onSubmit(e)}
            className="input"
            type="text"
            placeholder="Search Products"
            name="artist"
            value={artist}
            onChange={handleChange}
          />
          <Link to={`/${artist}`}>
            <img
              onClick={handleSearch}
              className="logo"
              src={searchIcon}
              alt="Search Icon"
            />
          </Link>
        </div>
        <div className="query-line"></div>
      </div>
      <nav className="nav">
        <Link to="/">
          <h3>Vinyl Emporium</h3>
        </Link>
        <ul className="nav-links">
          <li onClick={handleSearch}>Search</li>
          <li>
            <img
              className="logo"
              src={cartLogo}
              alt="Cart Logo"
              onClick={handleCart}
            />
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact element={<Shop />} />
        <Route path="/:id" element={<Artist />} />
        <Route
          path="/artist:id"
          element={
            <Product
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          }
        />
      </Routes>
      <div className="cart">
        <img
          src={closeDarkIcon}
          alt="Close Button"
          className="cart-close"
          onClick={handleCart}
        />
        <div className="cart-container">
          <h1 className="cart-title">{`Your\nShopping\nBag`}</h1>
          <div className="cart-list">
            {shoppingCart.length != 0 ? (
              shoppingCart.map((item) => (
                <CartItem
                  key={item.name}
                  album={item}
                  setShoppingCart={setShoppingCart}
                />
              ))
            ) : (
              <>
                <p style={{ margin: "40px 0 0", fontSize: "12px" }}>
                  Your Bag is Empty
                </p>
                <img
                  style={{
                    fill: "#e0ddda",
                    position: "absolute",
                    top: "calc(50% - 75px)",
                    left: "calc(50% - 75px)",
                    width: "180px",
                    height: "180px",
                  }}
                  src={cartBigLogo}
                />
              </>
            )}
            <div style={{ margin: "25px 0 0", fontSize: ".9rem" }}>
              {shoppingCart.length != 0 && `Subtotal: $${getSubTotal()}`}
            </div>
            <br />
            <br />
            <Link to="/">
              <div onClick={handleCart} className="checkout">
                {shoppingCart.length === 0 ? "Browse Products" : "Checkout"}
              </div>
            </Link>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
