import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="container">
      <div className="row cf">
        <div className="three col">
          <div className="loader" id="loader-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
