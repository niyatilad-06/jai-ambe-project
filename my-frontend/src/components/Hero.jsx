import React, { useEffect, useState } from "react";

const API_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/hero-sections?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API:", res);

        if (res?.data?.length > 0) {
          setHero(res.data[0].attributes); 
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!hero) return <p>Loading...</p>;

  // Image
  const imageUrl =
    hero?.heroImage?.data?.attributes?.url
      ? API_URL + hero.heroImage.data.attributes.url
      : "https://via.placeholder.com/500x300";

  //  Rich Text (Blocks)
  const description =
    hero.description?.[0]?.children?.[0]?.text || "";

  return (
    <section id="home" className="hero-section position-relative">

      {/* BACKGROUND */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>

      <div className="hero-overlay"></div>

      <div className="container h-100">
        <div className="row h-100 align-items-center">

          {/* LEFT */}
          <div className="col-lg-7 text-white">

            <h1 className="display-4 fw-bold mb-3">
              {hero.title}
            </h1>

            <p className="lead mb-4">
              {description}
            </p>

            <a
              href={hero.buttonLink1 || "#products"}
              className="btn btn-teal btn-lg me-2"
            >
              {hero.buttonText1 || "View Products"}
            </a>

            <a
              href={hero.buttonLink2 || "#contact"}
              className="btn btn-outline-light btn-lg"
            >
              {hero.buttonText2 || "Get in Touch"}
            </a>

          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-5">
            <img
              src={
                    imageUrl?.startsWith("http")
                      ? imageUrl
                      : API_URL + imageUrl
                  }
              className="img-fluid rounded shadow-lg"
              alt="hero"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;