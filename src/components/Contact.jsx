import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function Contact() {
  const [data, setData] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/contact`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));

    fetch(`${BASE_URL}/api/footers`)
      .then((res) => res.json())
      .then((res) => setFooter(res.data?.[0]?.attributes))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return null;

  const attrs = data.attributes;

  const description =
    attrs?.description?.[0]?.children?.[0]?.text || "";

  return (
    <>
      <section id="contact" className="py-5 contact-section">
        <div className="container">
          <h2>{attrs?.title}</h2>
          <p>{description}</p>
          <p>{attrs?.phone}</p>
          <p>{attrs?.email}</p>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>
            {footer?.copyrightText ||
              "© 2026 Jai Ambe Industries"}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Contact;