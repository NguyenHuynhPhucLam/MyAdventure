import React, { useState } from "react";
import { MyLogo } from "../../assets/logos";
import IC_Drawer from "../../assets/icons/drawer.png";
import IC_Home from "../../assets/icons/home.png";
import IC_Tours from "../../assets/icons/tours.png";
import IC_Cart from "../../assets/icons/shopping-cart.png";
import IC_Report from "../../assets/icons/report.png";
import User from "./userIcon.png";
import Logout from "../../assets/icons/logout.png";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignedInTabbar = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      Cookies.remove("signedIn");
      onLogin(false, false);
      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("email");
    }
  };
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <div>
      {/* Tabbar Mobile & Tabblet */}
      <div className={styles.contentView2}>
        <Link to="/home">
          <img src={MyLogo} alt="LOGO" className={styles.logo} />
        </Link>

        <motion.div className={styles.container}>
          <motion.label
            className={styles.drawerIcon}
            htmlFor="display-overlay"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={IC_Drawer} alt="drawer" />
          </motion.label>
          <input
            type="checkbox"
            id="display-overlay"
            className={styles.checkDrawerIcon}
            style={{ display: "none" }}
          />
          <label htmlFor="display-overlay" className={styles.overlay}></label>
          <div className={styles.drawerView}>
            <motion.div className={styles.drawerContainer}>
              <img src={User} alt="LOGO" className={styles.logoDrawer} />
              <motion.div
                className={styles.optionRow}
                style={{ marginTop: "2.5vh" }}
                whileHover={{ backgroundColor: "#5CD6C0" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={IC_Home}
                  alt="home.png"
                  className={styles.optionIcon}
                />
                <motion.div
                  className={styles.contentText}
                  style={{ marginLeft: "2.5vw" }}
                >
                  <Link to="/home">Home</Link>
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.optionRow}
                whileHover={{ backgroundColor: "#5CD6C0" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={IC_Tours}
                  alt="tours.png"
                  className={styles.optionIcon}
                />
                <motion.div className={styles.dropdown}>
                  <motion.button
                    className={styles.contentText}
                    whileInView={{ color: "gray" }}
                    whileHover={{ color: "gray" }}
                    style={{ marginLeft: "2.5vw" }}
                  >
                    Tours
                  </motion.button>
                  <motion.div
                    className={styles.dropdownContent}
                    whileHover={{ color: "gray" }}
                  >
                    <Link to="company/vietnam-tours">Vietnam Tours</Link>
                    <Link to="company/international-tours">
                      International Tours
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.optionRow}
                whileHover={{ backgroundColor: "#5CD6C0" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={IC_Cart}
                  alt="shopping-cart.png"
                  className={styles.optionIcon}
                />
                <motion.div
                  className={styles.contentText}
                  whileInView={{ color: "gray" }}
                  style={{ marginLeft: "2.5vw" }}
                >
                  <Link to="company/booking-management">Booking</Link>
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.optionRow}
                whileHover={{ backgroundColor: "#5CD6C0" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={IC_Report}
                  alt="report.png"
                  className={styles.optionIcon}
                />
                <motion.div
                  className={styles.contentText}
                  style={{ marginLeft: "2.5vw" }}
                >
                  <Link to="company/report">Report</Link>
                </motion.div>
              </motion.div>

              <motion.div
                className={styles.optionRow}
                onClick={handleLogout}
                whileHover={{ backgroundColor: "#5CD6C0" }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.img
                  src={Logout}
                  alt="shopping-cart.png"
                  className={styles.optionIcon}
                />
                <motion.div
                  className={styles.contentText}
                  style={{ marginLeft: "2.5vw" }}
                >
                  <Link to="/contact">Logout</Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        {/*  */}
      </div>
      {/* Tabbar PC */}
      <div className={styles.contentView1}>
        <Link to="/home">
          <img src={MyLogo} alt="LOGO" className={styles.logo} />
        </Link>
        <motion.div className={styles.container}>
          <motion.div
            className={styles.contentText}
            whileHover={{ color: "#5CD6C0" }}
            style={{ marginLeft: "25em" }}
          >
            <Link to="/company/home">Home</Link>
          </motion.div>

          {/* <motion.div
          className={styles.contentText}
          whileHover={{ color: "#5CD6C0" }}
          >
          <Link to="/booking">Booking</Link>
        </motion.div> */}

          <motion.div className={styles.dropdown}>
            <motion.button className={styles.contentText}>Tours</motion.button>
            <motion.div className={styles.dropdownContent}>
              <Link to="/company/vietnam-tours">Vietnam Tours</Link>
              <Link to="/company/international-tours">International Tours</Link>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.contentText}
            whileHover={{ color: "#5CD6C0" }}
          >
            <Link to="/company/booking-management">Booking</Link>
          </motion.div>

          <motion.div
            className={styles.contentText}
            whileHover={{ color: "#5CD6C0" }}
          >
            <Link to="/company/report">Report</Link>
          </motion.div>

          <motion.div className={styles.dropdown}>
            <motion.img
              src={User}
              alt="icon"
              className={styles.icon}
              whileHover={{ scale: 0.8 }}
            />
            <motion.div className={styles.dropdownContent}>
              <motion.button
                className={styles.horizon}
                onClick={handleLogout}
                onHover={{ scale: 0.8 }}
              >
                <motion.img
                  src={Logout}
                  alt="icon"
                  className={styles.logoutIc}
                />
                <motion.span className={styles.logout}>Log out</motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignedInTabbar;
