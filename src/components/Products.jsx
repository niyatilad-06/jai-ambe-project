import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/bearings?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API DATA:", res);

        // ✅ SAFE FIX
        setProducts(res?.data || []);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]); // ✅ prevent crash
      });
  }, []);

  // ✅ PREVENT WHITE SCREEN
  if (!products || products.length === 0) return null;

  return (
    <section id="products" className="section-padding">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">
          Precision Bearing Solutions
        </h2>

        <div className="row">
          {products.map((item, i) => {
            const title =
              item?.attributes?.title || item?.title;

            const desc =
              item?.attributes?.description || item?.description;

            const image =
              item?.attributes?.image?.data?.attributes?.url ||
              item?.image?.url;

            return (
              <div className="col-md-6" key={i}>
                <div className="card p-3 shadow-sm">

                  {image && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${image}`}
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