import React from "react";
import instrument from "../assets/home_img.png";
import {Link} from 'react-router-dom'

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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              fuga obcaecati doloribus libero, ipsum accusantium amet, officia
              ipsam et sed sunt fugit optio tempora laudantium repellat quod?
              Illum, dolorum dicta! Odio commodi, non laborum rerum ratione
              quasi hic ducimus obcaecati nihil, nemo exercitationem
              reprehenderit eius officiis fugit debitis dolores cumque
              voluptatem molestiae sint corporis cupiditate a impedit nulla aut?
              Et reprehenderit quos enim qui vitae debitis corporis nemo ab
              aliquid.
            </p>
          </div>
          <div className="home-btn">
            <Link to = '/products' className="btn">shop now</Link>
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
