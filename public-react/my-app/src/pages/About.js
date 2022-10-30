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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ea
              consequatur ipsum temporibus id obcaecati ipsa, sapiente quibusdam
              maxime omnis ab deleniti explicabo perspiciatis labore dolorum
              esse quo maiores nesciunt, molestiae asperiores neque architecto
              pariatur! Nemo harum impedit molestias, reiciendis iure ab dolor
              voluptates. Enim ipsa velit harum, in eligendi similique
              voluptates soluta consectetur nobis ratione, quam rerum qui
              quisquam vitae eum sit corporis omnis! Eligendi id dignissimos
              fugiat commodi ab hic blanditiis velit inventore voluptates autem
              consequuntur saepe amet magni aut, quia a eos impedit enim sint
              sit reprehenderit. Temporibus provident, deleniti expedita
              corrupti dolore est quasi explicabo commodi ducimus voluptatem
              itaque quibusdam maxime officia autem ipsam quisquam. At.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
