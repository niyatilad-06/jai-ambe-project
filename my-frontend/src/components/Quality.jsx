import { useEffect, useState } from "react";

const API = "https://renowned-unity-60b52ac485.strapiapp.com";

function Quality() {
  const [cards, setCards] = useState([]);
   const imageUrl = data?.image?.url;

  useEffect(() => {
    fetch(`${API}/api/service-cards?populate=*`)
      .then((res) => res.json())
      .then((data) => setCards(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="quality" className="section-padding">
      <div className="container">

        {/* TITLE */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Quality Services</h2>
        </div>

        {/* CARD ROW */}
        <div className="row g-4 justify-content-center">

          {cards.map((card, index) => {

            // Strapi v5 safe access
            const title = card?.attributes?.title || card.title;

            const imageUrl =
              card?.attributes?.image?.data?.attributes?.url
                ? API + card.attributes.image.data.attributes.url
                : "";

            return (
              <div
                key={card.id}
                className="col-lg-6 col-md-6"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >

                <div className="service-item position-relative overflow-hidden">

                  <div className="service-img">
                    {imageUrl && (
                      <img
                        src={imageUrl?.startsWith("http") ? imageUrl : API_URL + imageUrl}
                        alt={title}
                        className="img-fluid w-100"
                      />
                    )}
                  </div>

                  <div className="service-text text-center">
                    <h5>{title}</h5>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Quality;