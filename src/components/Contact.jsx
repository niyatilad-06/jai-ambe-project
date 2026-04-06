import { useEffect, useState } from "react";

function Contact() {
  const [data, setData] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch("http://localhost:1337/api/contact")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));

    fetch("http://localhost:1337/api/footers")
      .then((res) => res.json())
      .then((res) => setFooter(res.data[0]?.attributes))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const description =
    data.description?.[0]?.children?.[0]?.text || "";

  return (
    <>
      <section id="contact" className="py-5 contact-section">
        <div className="container">
          <div className="row align-items-center gx-5 gy-4">

            {/* LEFT SIDE */}
            <div className="col-lg-5 text-white d-flex flex-column justify-content-center pe-lg-5">

              <h2 style={{ fontSize: "42px", fontWeight: "700" }}>
                {data.title}
              </h2>

              <h6
                className="text-info"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "15px",
                  letterSpacing: "1px"
                }}
              >
                {data.subtitle}
              </h6>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  color: "#e6e6e6",
                  marginBottom: "20px",
                  maxWidth: "500px"
                }}
              >
                {description}
              </p>

              <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                <i className="fas fa-phone me-2 text-info"></i>
                {data.phone}
              </p>

              <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                <i className="fas fa-map-marker-alt me-2 text-info"></i>
                {data.address}
              </p>

              <p style={{ fontSize: "16px" }}>
                <i className="fas fa-envelope me-2 text-info"></i>
                {data.email}
              </p>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-7">
              <div className="card p-4 shadow">

                <h5>{data.formTitle}</h5>

                <form>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <input className="form-control" placeholder={data.namePlaceholder} />
                    </div>

                    <div className="col-md-6">
                      <input className="form-control" placeholder={data.emailPlaceholder} />
                    </div>

                    <div className="col-md-6">
                      <input className="form-control" placeholder={data.companyPlaceholder} />
                    </div>

                    <div className="col-md-6">
                      <input className="form-control" placeholder={data.phonePlaceholder} />
                    </div>

                    <div className="col-12">
                      <textarea className="form-control" placeholder={data.messagePlaceholder}></textarea>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary">
                        {data.buttonText}
                      </button>
                    </div>

                  </div>
                </form>

                <div
                  className="mt-2"
                  style={{ overflow: "hidden", borderRadius: "10px" }}
                  dangerouslySetInnerHTML={{
                    __html: data.mapEmbed || ""
                  }}
                ></div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>
            {footer
              ? footer.copyrightText
              : "© 2026 Jai Ambe Industries. All rights reserved."}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Contact; 