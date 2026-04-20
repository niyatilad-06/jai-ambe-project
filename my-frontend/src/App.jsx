import React, { useEffect, useState } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Contact from "./components/Contact";
import Infrastructure from "./components/Infrastructure";
import Applications from "./components/Applications";
import Quality from "./components/Quality";
import Manufacturing from "./components/Manufacturing";
import Products from "./components/Products";
import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {

  // 🔥 STATE FOR STRAPI DATA
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    // AOS INIT
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    // SMOOTH SCROLL
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.onclick = function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
        }
      };
    });

    // SCROLL SPY
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    // 🔥 FETCH DATA FROM STRAPI
    fetch("https://renowned-unity-60b52ac485.strapiapp.com/api/contact")
      .then(res => res.json())
      .then(data => {
        console.log("STRAPI DATA:", data);
        setContactData(data.data);
      })
      .catch(err => console.error("API ERROR:", err));

  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Manufacturing />
      <Quality />
      <Applications />
      <Infrastructure />

      {/* 🔥 PASS DATA TO CONTACT */}
      <Contact data={contactData} />
    </>
  );
}

export default App;