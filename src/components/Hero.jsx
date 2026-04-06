import React, { useEffect, useState } from "react";

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/hero-sections?populate=*")
      .then((res) => res.json())
      .then((data) => {
        console.log("API:", data);

        if (data?.data?.length > 0) {
          setHero(data.data[0]); // ✅ Strapi v5 format
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!hero) return <p>Loading...</p>;

  // ✅ Image Fix (Strapi v5)
  const imageUrl = hero?.heroImage?.url
    ? "http://localhost:1337" + hero.heroImage.url
    : "https://via.placeholder.com/500x300";

  // ✅ Description Fix (Rich Text safe)
  const description =
    typeof hero.description === "string"
      ? hero.description
      : hero.description?.[0]?.children?.[0]?.text || "Default description";

  return (
    <section id="home" className="hero-section position-relative">

      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

      <div className="hero-overlay"></div>

      <div className="container h-100">
        <div className="row h-100 align-items-center">

          <div className="col-lg-7 text-white">
            <h1 className="display-4 fw-bold mb-3">
              {hero.title || "Default Title"}
            </h1>

            <p className="lead mb-4">
              {description}
            </p>

            <a
              href={hero.buttonLink1 || "#"}
              className="btn btn-teal btn-lg me-2"
            >
              {hero.buttonText1 || "Button 1"}
            </a>

            <a
              href={hero.buttonLink2 || "#"}
              className="btn btn-outline-light btn-lg"
            >
              {hero.buttonText2 || "Button 2"}
            </a>
          </div>

          <div className="col-lg-5">
            <img
              src={imageUrl}
              className="img-fluid rounded"
              alt="hero"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;