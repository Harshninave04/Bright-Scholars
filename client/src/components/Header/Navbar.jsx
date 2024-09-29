import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ThemeButton from "./ThemeButton";
import HamburgerButton from "./HamburgerButton";
import NavMenu from "./NavMenu";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { IoIosNotifications } from "react-icons/io"

const Navbar = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const [scrolling, setScrolling] = useState(false); // Track scrolling state
  const { logout } = useGlobalContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let sideMenuClass =
    "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow";
  let topMenuClass = "menu menu-horizontal px-1";

  return (
    <div
      className={`navbar bg-base-200 text-base-content sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolling ? " shadow-lg" : "bg-opacity-100 shadow-none"
      }`}
    >
      <div className="navbar-start">
        <details className="dropdown lg:hidden">
          <HamburgerButton />

          <NavMenu isAuthenticated={isAuthenticated} classes={sideMenuClass} />
        </details>
        <Link to="/" className="btn btn-ghost text-xl">Scholars</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavMenu isAuthenticated={isAuthenticated} classes={topMenuClass} />
      </div>

      <div className="navbar-end">
        {isAuthenticated && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                <IoIosNotifications className="text-2xl"/>
                  <span className="badge badge-sm rounded-badge indicator-item  badge-primary">
                    8
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ThemeButton />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profileImage}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="justify-between">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/" className="justify-between">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/">Settings</Link>
                </li>
                <li>
                  <Link onClick={logout}>Logout</Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {!isAuthenticated && <ThemeButton />}
      </div>
    </div>
  );
};

export default Navbar;
