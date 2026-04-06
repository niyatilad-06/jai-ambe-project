import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Quality() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/service-cards?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data?.data || []);
      })
      .catch((err) => console.log(err)); // ✅ added safety
  }, []);

  return (
    <section id="quality" className="section-padding">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Quality Services</h2>
        </div>

        <div className="row g-4 justify-content-center">

          {cards.length > 0 &&
            cards.map((card, index) => {

              const title =
                card?.attributes?.title || card?.title;

              const image =
                card?.attributes?.image?.data?.attributes?.url ||
                card?.image?.url;

              const imageUrl = image
                ? `${BASE_URL}${image}`
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
                      <img
                        src={imageUrl}
                        alt={title}
                        className="img-fluid w-100"
                      />
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