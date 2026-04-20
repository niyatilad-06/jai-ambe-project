import { useEffect, useState } from "react";

const API_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

function Infrastructure() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/infrastructure?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API:", res);
        setData(res.data?.attributes); 
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  //  Rich text (Blocks)
  const description =
    data.description?.[0]?.children?.[0]?.text || "";

  // Image
  const imageUrl =
    data?.image?.data?.attributes?.url
      ? API_URL + data.image.data.attributes.url
      : "https://via.placeholder.com/500x300";

  return (
    <section id="infrastructure" className="section-padding">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT */}
          <div className="col-lg-6">

            <span className="section-kicker">Infrastructure</span>

            <h2 className="section-title">{data.title}</h2>

            <p>{description}</p>

            {/* ICON LIST */}
            <ul className="list-unstyled product-list mt-4">

              <li>
                <i className="fa-solid fa-industry text-teal me-2"></i>
                {data.plants} plants
              </li>

              <li>
                <i className="fa-solid fa-warehouse text-teal me-2"></i>
                {data.warehouses} warehouses
              </li>

              <li>
                <i className="fa-solid fa-layer-group text-teal me-2"></i>
                {data.products}+ product SKUs
              </li>

              <li>
                <i className="fa-solid fa-users text-teal me-2"></i>
                {data.customers}+ customers
              </li>

              <li>
                <i className="fa-solid fa-clock-rotate-left text-teal me-2"></i>
                {data.experience}+ years experience
              </li>

              <li>
                <i className="fa-solid fa-globe-asia text-teal me-2"></i>
                {data.presence}
              </li>

            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">
            <div className="infra-gallery">
              <img
                src={
                    imageUrl?.startsWith("http")
                      ? imageUrl
                      : API_URL + imageUrl
                  }
                alt="Infrastructure"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Infrastructure;