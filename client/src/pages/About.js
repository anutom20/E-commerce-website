import React from "react";
import Guitar from "../assets/Guitar_by_Rones.png";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-img-container">
          <img className="about-img" src={Guitar} alt="guitar" />
        </div>
        <div className="about-content">
          <div className="about-title">
            <h1>Our Story</h1>
          </div>
          <div className="about-info">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, minus maxime eveniet corporis laboriosam architecto eum quasi. Itaque iste debitis autem facilis architecto in asperiores quos, ullam hic placeat impedit? Commodi ratione voluptatum temporibus laudantium expedita voluptates est, reprehenderit officia eveniet maiores explicabo, atque exercitationem aliquid corrupti. Blanditiis consequatur reiciendis maxime natus cupiditate temporibus ab, tempora officia impedit facere, eveniet esse quasi suscipit dolor perferendis laudantium magni at odio. Quae beatae id aliquam illum asperiores similique delectus quasi, quas obcaecati!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
