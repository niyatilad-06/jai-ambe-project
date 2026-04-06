import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/company_logo.png";

function Navbar() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/navbars`)
      .then((res) => {
        setMenu(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header className="sticky-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">

          {/* LOGO */}
          <a className="navbar-brand" href="#home">
            <img src={logo} alt="logo" style={{ height: "140px" }} />
          </a>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV ITEMS */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav main-nav text-uppercase fw-semibold small">

              {menu.length > 0 &&
                menu
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <li className="nav-item" key={item.id}>
                      <a
                        className="nav-link"
                        href={`#${item.link ? item.link.replace("/", "") : ""}`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))
              }

            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;