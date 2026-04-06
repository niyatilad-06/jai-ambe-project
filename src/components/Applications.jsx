import React, { useEffect, useState } from "react";

function Applications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/applications?populate=*")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="industries" className="py-5 bg-light">
      <div className="container-fluid text-center" style={{ padding: "0 50px" }}>
        
        <h2 className="fw-bold mb-5">Applications</h2>

        <div className="row g-3 justify-content-center">
          {data.slice(0, 4).map((item, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="card p-3 shadow">
                
                <img
                  src={
                    item.image?.url
                      ? "http://localhost:1337" + item.image.url
                      : "https://via.placeholder.com/300x200"
                  }
                  className="img-fluid rounded w-100"
                  style={{
                    height: "280px",
                    objectFit: "cover",
                  }}
                  alt="application"
                />

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Applications;