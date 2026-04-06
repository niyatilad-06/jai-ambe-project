import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Applications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/applications?populate=*`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="industries" className="py-5 bg-light">
      <div className="container text-center">
        <h2>Applications</h2>

        <div className="row">
          {data.map((item, i) => {
            const image =
              item?.attributes?.image?.data?.attributes?.url;

            return (
              <div className="col-md-3" key={i}>
                <img
                  src={image ? `${BASE_URL}${image}` : ""}
                  alt=""
                  className="img-fluid"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Applications;