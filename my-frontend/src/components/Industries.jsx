function Industries() {
   const imageUrl = data?.image?.url;
  return (
    <section id="industries" className="section-padding bg-light">
      <div className="container text-center">
        <h2>Industries</h2>
        <img src={
                    imageUrl?.startsWith("http")
                      ? imageUrl
                      : API_URL + imageUrl
                  } />
      </div>
    </section>
  );
}

export default Industries;