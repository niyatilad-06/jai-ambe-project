import React, { useEffect, useState } from "react";

const API_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

function Applications() {
  const [data, setData] = useState([]);
   const imageUrl = data?.image?.url;

  useEffect(() => {
    fetch(`${API_URL}/api/applications?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="industries" className="py-5 bg-light">
      <div className="container text-center">

        <h2 className="fw-bold mb-5">Applications</h2>

        <div className="row g-4">
          {data.map((item, i) => {
            const imageUrl =
              item.attributes?.image?.data?.attributes?.url;

            return (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="card p-2 shadow-sm">

                  <img
                    src={
                          imageUrl
                            ? imageUrl.startsWith("http")
                              ? imageUrl
                              : API_URL + imageUrl
                            : ""
                        }
                    className="img-fluid rounded"
                    style={{
                      height: "260px",
                      objectFit: "cover",
                    }}
                    alt="application"
                  />

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Applications;