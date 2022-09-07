import React, { useState, useEffect } from "react";
// import Grid from "@material-ui/core/Grid";
import portfolioIcon from "./about-us-icons/portfolio-icon-with-png-and-vector-format-for-free-unlimited-186408.png";
import smileIcon from "./about-us-icons/happy-smile-smile-emoji-smile-emoticon-icon-319098.png";
import lightIcon from "./about-us-icons/l-light-light-bulb-icon-png-and-vector-for-free-download-926826.png";
import cupIcon from "./about-us-icons/cups-icon-437424.png";
function About() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const counter = (set, start, end, duration) => {
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        set((current) => {
          if (current <= end) {
            return (current += increment);
          } else {
            clearInterval(timer);
            set(current - 1);
          }
        });
      }, step);
  };

  useEffect(() => {
    counter(setCount1, 0, 607, 3000);
    counter(setCount2, 0, 398, 2500);
    counter(setCount3, 0, 480, 2900);
    counter(setCount4, 10, 500, 5420);
  }, []);
  // counter(setCount1, 0, 607, 3000);
  // console.log("boucle infinie");

  return (
    <div className="about">
              
      <div className="about-text">
                   <h3> Bienvenue dans notre site E-sante</h3>
        <p style={{ textAlign: "center" }}>
          {
            "E-sante est fondé en 2020 ,est un acteur majeur du secteur des soins de santé Au cœur de l’écosystème de la santé, E-sante connecte, conseille et accompagne les professionnels de santé dans l’amélioration continue de la qualité de soin et de la prévention."
          }
        </p>
                   
      </div>
                
      <section
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          background: "#eee",
          width: "100%",
          padding: "48px 64px",
        }}
      >
        <div
          class="col-md-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <img src={portfolioIcon} style={{ width: "60px", height: "60px" }} alt="portfolio"/>
          <span
            id="count1"
            style={{
              margin: "12px",
              fontSize: "40px",
              fontWeight: 550,
              color: "#f50057",
            }}
          >
            {count1}{" "}
          </span>
          <span style={{ fontWeight: 500, fontSize: "22px" }}>
            Project Done
          </span>
        </div>
        <div
          class="col-md-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <img src={cupIcon} style={{ width: "60px", height: "60px" }} alt="cup"/>
          <span
            id="count2"
            style={{
              margin: "12px",
              fontSize: "40px",
              fontWeight: 550,
              color: "#f50057",
            }}
          >
            {count2}{" "}
          </span>
          <span style={{ fontWeight: 500, fontSize: "22px" }}>
            Cups Of Coffee
          </span>
        </div>
        <div
          class="col-md-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <img src={lightIcon} style={{ width: "60px", height: "60px" }} alt="light"/>
          <span
            id="count3"
            style={{
              margin: "12px",
              fontSize: "40px",
              fontWeight: 550,
              color: "#f50057",
            }}
          >
            {count3}
          </span>
          <span style={{ fontWeight: 500, fontSize: "22px" }}>Branding</span>{" "}
        </div>
        <div
          class="col-md-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <img src={smileIcon} style={{ width: "60px", height: "60px" }} alt="smile"/>
          <span
            id="count4"
            style={{
              margin: "12px",
              fontSize: "40px",
              fontWeight: 550,
              color: "#f50057",
            }}
          >
            {count4}
          </span>
          <span style={{ fontWeight: 500, fontSize: "22px" }}>
            Happy Clients
          </span>{" "}
        </div>
      </section>
    </div>
  );
}
export default About;
