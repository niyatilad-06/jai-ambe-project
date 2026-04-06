import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/hero-sections?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setHero(data.data?.[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!hero) return null;

  const attrs = hero.attributes;

  const image =
    attrs?.heroImage?.data?.attributes?.url;

  return (
    <section id="home">
      <h1>{attrs?.title}</h1>
      <img src={`${BASE_URL}${image}`} alt="" />
    </section>
  );
}

export default Hero;