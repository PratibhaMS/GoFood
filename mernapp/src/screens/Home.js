import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  useEffect(() => {
    getCardData();
  }, []);
  const getCardData = async () => {
    const response = await fetch("http://localhost:5000/api/foodData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setFoodCat(json.foodCatArr);
    setFoodItem(json.foodArr);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuAqUcJLTA6MKlPkNikKqmfPr1d_z27J8XbA&s"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", height: "400px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVRqRjIuYEjRTvC8TJYdUlI8cDdDryHyn-3g&s"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", height: "400px" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhBOo0AmQX2jy7yYNZPGRq7VHELJlmFI0Ug&s"
                className="d-block w-100"
                style={{ filter: "brightness(30%)", height: "400px" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => (
              <div className="row mb-3" key={data.id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((food) => (
                      <div key={food.id} className="col-12 col-md-6 col-lg-3">
                        <Card cardData={food} />
                      </div>
                    ))
                ) : (
                  <div>
                    <h1>No Such data found</h1>
                  </div>
                )}
              </div>
            ))
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
