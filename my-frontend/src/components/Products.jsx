import { useEffect, useState } from "react";

const API = "https://renowned-unity-60b52ac485.strapiapp.com";

function Products() {
  const [products, setProducts] = useState([]);
   const imageUrl = data?.image?.url;

  useEffect(() => {
    fetch(`${API}/api/bearings?populate=*`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
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
            const title = item.title;
            const desc = item.description;
            const image = item.image?.url;

            return (
              <div className="col-md-6" key={i}>
                <div className="card p-3 shadow-sm">

                  {image && (
                    <img
                      src={image?.startsWith("http") ? image : API + image}
                      alt={title}
                      style={{ height: "300px", objectFit: "cover" }}
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