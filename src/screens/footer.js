import React from "react";
import { TextField, Button } from "@material-ui/core";

import logo from "./logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img
          src={logo}
          alt="icon"
          style={{
            margin: "8px",
          }}
        />
        <div
          style={{
            marginTop: "8px",
          }}
        >
          © 2020 ESANTE.
        </div>
        <h4>All Rights Reserved</h4>
      </div>
      <div>
        <div
          style={{
            margin: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <bold>ABOUT US</bold>
        </div>
        {["About us", "Store location", "Contact", "Orders"].map((elem) => (
          <div
            style={{
              margin: "8px",
              cursor: "pointer",
            }}
          >
            {elem}
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            margin: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <bold>USEFUL LINKS</bold>
        </div>
        {["Returns", "Support Policy", "Size guide", "FAQs"].map((elem) => (
          <div
            style={{
              margin: "8px",
              cursor: "pointer",
            }}
          >
            {elem}
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            margin: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <bold>FOLLOW US</bold>
        </div>
        {["Facebook", "Twitter", "Instagram", "Youtube"].map((elem) => (
          <div
            style={{
              margin: "8px",
              cursor: "pointer",
            }}
          >
            {elem}
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            margin: "8px",
            fontWeight: 600,
            cursor: "pointer",
          }}
          className="hoverr"
        >
          <bold>SUBSCRIBE</bold>
        </div>
        <p
          style={{
            margin: "5px",
            fontSize: "12px",
          }}
        >
          Get E-mail updates about our latest shop <br />
          and special offers.
        </p>
        <TextField
          placeholder="Enter your email address"
          style={{
            margin: "5px",
          }}
        />
        <br />
        <Button
          href="/#"
          style={{
            fontSize: "12px",
            marginLeft: "8px",
            padding: 0,
            height: "30px",
            outline: "none",
          }}
          color="#eee"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Footer;
