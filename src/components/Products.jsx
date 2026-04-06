import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/bearings?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setProducts(data.data);
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
            const title = item?.title || item?.attributes?.title;
            const desc = item?.description || item?.attributes?.description;

            const image =
              item?.image?.url ||
              item?.attributes?.image?.data?.attributes?.url;

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