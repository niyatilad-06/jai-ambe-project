import React, { useEffect, useState } from "react";

function Manufacturing() {
  const [section, setSection] = useState(null);
  const [processes, setProcesses] = useState([]);

  const BASE_URL = "https://renowned-unity-60b52ac485.strapiapp.com";

  useEffect(() => {
    // 🔹 Fetch section
    fetch(`${BASE_URL}/api/manufacturing-section?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setSection(data.data);
      })
      .catch((err) => console.log(err));

    // 🔹 Fetch process cards
    fetch(`${BASE_URL}/api/manfacturing-processes?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setProcesses(data.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ Safe access
  const heading =
    section?.attributes?.heading || section?.heading;

  const mainImage =
    section?.attributes?.mainImage?.data?.attributes?.url ||
    section?.mainImage?.url;

  // ✅ FIXED IMAGE URL
  const mainImageUrl = mainImage
    ? (mainImage.startsWith("http")
        ? mainImage
        : BASE_URL + mainImage)
    : "";

  return (
    <section id="manufacturing" className="section-padding bg-light">
      <div className="container text-center">

        {/* 🔥 Heading */}
        <h2 className="fw-bold mb-4">{heading}</h2>

        {/* 🔥 Main Image */}
        {mainImageUrl && (
          <img
            src={mainImageUrl}
            alt="Manufacturing"
            className="img-fluid mb-4"
            style={{
              maxWidth: "1000px",
              borderRadius: "10px",
            }}
          />
        )}

        {/* 🔥 Process Cards */}
        <div className="row justify-content-center">
          {processes.length > 0 &&
            processes.map((item, i) => {
              const title =
                item?.attributes?.title || item?.title;

              const image =
                item?.attributes?.image?.data?.attributes?.url ||
                item?.image?.url;

              // ✅ FIXED IMAGE URL
              const imageUrl = image
                ? (image.startsWith("http")
                    ? image
                    : BASE_URL + image)
                : "";

              return (
                <div className="col-md-3 col-6 mb-4" key={i}>
                  <div className="card p-3 shadow-sm">

                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={title}
                        style={{
                          width: "100%",
                          height: "170px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}

                    <p className="mt-3 fw-semibold">{title}</p>

                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}

export default Manufacturing;