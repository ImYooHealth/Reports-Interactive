/** App.js */
import React from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
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
  width: 630,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  }
};

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const legendData = [portfolioData, schcData, vcitData];
  const chartData = [
    portfolioData,
    ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name))
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} dimensions={dimensions} />
    </div>
  );
}
