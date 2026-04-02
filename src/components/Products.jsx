import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  const BASE_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

  useEffect(() => {
    fetch(`${BASE_URL}/api/bearings?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setProducts(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="products" className="section-padding">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">
          Precision Bearing Solutions
        </h2>

        <div className="row">
          {products.map((item, i) => {
            
            // ✅ SAFE ACCESS
            const title = item?.title || item?.attributes?.title;
            const desc = item?.description || item?.attributes?.description;

            const image =
              item?.image?.url ||
              item?.attributes?.image?.data?.attributes?.url;

            // ✅ FIXED IMAGE URL
            const imageUrl = image
              ? (image.startsWith("http")
                  ? image
                  : BASE_URL + image)
              : "";

            return (
              <div className="col-md-6" key={i}>
                <div className="card p-3 shadow-sm">

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <h4 className="mt-3">{title}</h4>
                  <p>{desc}</p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;