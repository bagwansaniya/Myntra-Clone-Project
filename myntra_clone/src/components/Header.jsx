import { BsPersonFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { itemAction } from "../store/itemslice";
const Header = () => {
  const searchref = useRef("");
  const bag = useSelector((store) => store.Bagdata);

  const dispatch = useDispatch();

  return (
    <>
      <header>
        <div className="logo_container">
          <Link to="/">
            <img
              className="myntra_home"
              src="images/myntra_logo.webp"
              alt="Myntra Home"
            />
          </Link>
        </div>
        <nav className="nav_bar">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">
            Studio <sup>New</sup>
          </a>
        </nav>
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">search</span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            ref={searchref}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "enter") {
                dispatch(itemAction.searchitem(searchref.current.value));
              }
            }}
          />
        </div>
        <div className="action_bar">
          <Link to="/profile" className="action_container">
            <BsPersonFill />
            <span className="action_name">Profile</span>
          </Link>

          <div className="action_container">
            <BsHeart />
            <span className="action_name">Wishlist</span>
          </div>

          <Link className="action_container" to="/bag">
            <BsHandbag />
            <span className="action_name">Bag</span>
            <span className="bag-item-count">{bag.length}</span>
          </Link>
        </div>
      </header>
    </>
  );
};
export default Header;
