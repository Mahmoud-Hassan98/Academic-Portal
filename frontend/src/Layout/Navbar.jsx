import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { jwtDecode } from "jwt-decode";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [userRole, setUserRole] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} style={{ height: "80px", width: "150px" }} />
        </Link>
        <div className="flex md:order-2">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                style={{ backgroundColor: "#7831ed" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="login">
              <button
                type="button"
                className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                style={{ backgroundColor: "#7831ed" }}
              >
                Get Started 
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 w-full">
            <li>
              <Link
                to="/"
                className={
                  activeLink === "home"
                    ? "block py-2 pl-3 pr-4 text-[#7831ed] font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-[#7831ed] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                }
                aria-current="page"
                onClick={() => handleLinkClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={
                  activeLink === "courses"
                    ? "block py-2 pl-3 pr-4 text-[#7831ed] font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-[#7831ed] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                }
                onClick={() => handleLinkClick("courses")}
              >
                Courses
              </Link>
            </li>
            {userRole == "teacher" && (
              <li>
                <Link
                  to="my-courses"
                  className={
                    activeLink === "my-courses"
                      ? "block py-2 pl-3 pr-4 text-[#7831ed] font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-[#7831ed] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                  }
                  onClick={() => handleLinkClick("my-courses")}
                >
                  My courses
                </Link>
              </li>
            )}
            <li>
              <Link
                to="about"
                className={
                  activeLink === "about"
                    ? "block py-2 pl-3 pr-4 text-[#7831ed] font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-[#7831ed] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#7831ed] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 no-underline"
                }
                onClick={() => handleLinkClick("about")}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
