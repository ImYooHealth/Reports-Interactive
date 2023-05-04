/** App.js */
import React from "react";
import MultilineChart from "./views/MultilineChart";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import portfolio from "./portfolio.json";
import "./styles.css";

const portfolioData = {
  name: "Portfolio",
  color: "#ffffff",
  items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
};
const schcData = {
  name: "SCHC",
  color: "#d53e4f",
  items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
};
const vcitData = {
  name: "VCIT",
  color: "#5e4fa2",
  items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
};

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};

export default function App() {
  return (
    <div className="App">
      <MultilineChart
        data={[portfolioData, schcData, vcitData]}
        dimensions={dimensions}
      />
    </div>
  );
}
