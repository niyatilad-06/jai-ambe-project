import { useEffect, useState } from "react";

function Infrastructure() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/infrastructure?populate=*")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const description =
    data.description?.[0]?.children?.[0]?.text || "";

  const imageUrl =
    data.image?.url
      ? "http://localhost:1337" + data.image.url
      : "";

  return (
    <section id="infrastructure" className="section-padding">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT */}
          <div className="col-lg-6">
            <h2>{data.title}</h2>

            <p>{description}</p>

            {/* ✅ ICON LIST */}
            <ul className="list-unstyled mt-3">

              <li className="mb-2">
                <i className="fas fa-industry me-2 text-primary"></i>
                {data.plants} plants
              </li>

              <li className="mb-2">
                <i className="fas fa-warehouse me-2 text-primary"></i>
                {data.warehouses} warehouses
              </li>

              <li className="mb-2">
                <i className="fas fa-boxes me-2 text-primary"></i>
                {data.products}+ product SKUs
              </li>

              <li className="mb-2">
                <i className="fas fa-users me-2 text-primary"></i>
                {data.customers}+ customers
              </li>

              <li className="mb-2">
                <i className="fas fa-clock me-2 text-primary"></i>
                {data.experience}+ years experience
              </li>

              <li className="mb-2">
                <i className="fas fa-globe me-2 text-primary"></i>
                {data.presence}
              </li>

            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6 text-center">
            <img
              src={imageUrl}
              alt="Infrastructure"
              className="img-fluid rounded"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Infrastructure;