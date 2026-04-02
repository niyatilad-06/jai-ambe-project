import React, { useEffect } from "react";
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

// IMAGES
import transport from "./assets/transport.png";
import planetary from "./assets/planetary_gear.png";
import helical from "./assets/helical_gear.png";
import cncMilling from "./assets/cnc_milling.png";
import robot from "./assets/robot_speed.png";

function App() {

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

  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* ABOUT */}
      <About />

      {/* PRODUCTS */}
      <Products />

      {/* MANUFACTURING */}
      <Manufacturing />

      {/* QUALITY */}
      <Quality />

      <Applications />


      {/* INFRASTRUCTURE */} 
      <Infrastructure />

      {/* CONTACT */}
      <Contact />

    </>
  );
}

export default App;