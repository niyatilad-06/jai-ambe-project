import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/company_logo.png";

const API_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

function Navbar() {
  const [menu, setMenu] = useState([]);
   const imageUrl = data?.image?.url;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/navbars?populate=*`)
      .then((res) => {
        setMenu(res.data.data || []);
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
            <img
              src={logo?.startsWith("http") ? logo : API_URL + logo}
              alt="logo"
              style={{ height: "100px" }}
            />
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

              {menu
                .sort((a, b) => {
                  const orderA = a?.attributes?.order ?? 0;
                  const orderB = b?.attributes?.order ?? 0;
                  return orderA - orderB;
                })
                .map((item) => {
                  const title = item?.attributes?.title;
                  const link = item?.attributes?.link;

                  return (
                    <li className="nav-item" key={item.id}>
                      <a
                        className="nav-link"
                        href={`#${link?.replace("/", "")}`}
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}

            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;