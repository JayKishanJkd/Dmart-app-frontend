import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"; // Import the specific icon from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { UserName } from "../../pages/profile/Profile";

export const logo = (
  <div className={styles.logo}>
    <a href="/">
      <h2>
        <span>D</span>MART
      </h2>
    </a>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [scrollPage, setscrollPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setscrollPage(true);
    } else {
      setscrollPage(true);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  const taggleMenu = () => {
    setshowMenu(!showMenu);
  };
  const hideMenu = () => {
    setshowMenu(false);
  };
  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <Link href="/shop" className={activeLink}>
                Shop
              </Link>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to={"login"} className={activeLink}>
                  Login
                </NavLink>
                <NavLink to={"register"} className={activeLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to={"login"} className={activeLink}>
                  <FaUserCircle size={16} color="#ff7722" />
                  <UserName />
                </NavLink>
                <NavLink to="order-history" className={activeLink}>
                  My Order
                </NavLink>
                <Link to="/" onClick={logoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={taggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
