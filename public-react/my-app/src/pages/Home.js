import React from "react";
import instrument from "../assets/home_img.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-component">
        <div className="home-info">
          <div className="home-info-title">
            <h1>Unleash your inner musician!</h1>
          </div>
          <div className="home-info-para">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              dolore vel soluta vero eaque ab ea maiores amet error, tempora
              excepturi ipsam beatae corporis molestiae reiciendis numquam
              incidunt explicabo eos quibusdam? Asperiores fuga, maiores,
              excepturi soluta earum incidunt ullam voluptas, sapiente
              blanditiis nam ipsa modi tempore molestias provident repellat
              reprehenderit.
            </p>
          </div>
          <div className="home-btn">
            <Link to="/products" className="btn">
              shop now
            </Link>
          </div>
        </div>
        <div className="home-img-container">
          <img className="home-img" src={instrument} alt="home-img" />
        </div>
      </div>
    </section>
  );
};

export default Home;
