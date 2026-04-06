import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Infrastructure() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/infrastructure?populate=*`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return null;

  const attrs = data.attributes;

  const image =
    attrs?.image?.data?.attributes?.url;

  return (
    <section id="infrastructure">
      <h2>{attrs?.title}</h2>
      <img src={`${BASE_URL}${image}`} alt="" />
    </section>
  );
}

export default Infrastructure;