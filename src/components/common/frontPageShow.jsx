import React, { Component } from "react";

class FrontPageShow extends React.Component {
  render() {
    return (
      <div
        className="front--page"
        style={{
          width: "100%",
          "background-position": "center",
          backgroundImage: `linear-gradient(to right, rgb(0 0 0), rgba(38, 37, 38, 0.1)), url("https://cdn2.unrealengine.com/egs-starwarsbattlefrontiicelebrationedition-dice-g1a-01-1920x1080-87971829e831.jpg")`,
        }}
      >
        <div className="front--page__content">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Star_Wars_Yellow_Logo.svg/1024px-Star_Wars_Yellow_Logo.svg.png"
            alt="star war"
            style={{ width: "200px", opacity: 0.8, marginBottom: "10px" }}
          />
          {/* <h1 style={{ color: "white" }}>Star War</h1> */}
          <p style={{ width: "500px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            error, dignissimos autem quos dicta ab vero, culpa, officia nam unde
            iusto facere ducimus. Aliquam tempore non numquam ad quo impedit!
          </p>
          <button className="btn--FrontPage btn--filled">Get Started</button>
        </div>
      </div>
    );
  }
}

export default FrontPageShow;
