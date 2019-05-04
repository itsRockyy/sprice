import React from "react";
import StockChart from "./StockChart";
import Chart from "chart.js";

function Stock(props) {
  const { symbol, price } = props.stock;
  const justUpdated = props.justUpdated;
  let gain = false;
  let loss = false;
  let nodiff = false;
  let priceDiff = parseFloat(price.slice(-1) - price.slice(-2, -1)).toFixed(2);
  if (price.length > 1) {
    gain = priceDiff > 0 && justUpdated;
    loss = priceDiff < 0 && justUpdated;
    nodiff = priceDiff === 0 && justUpdated;
  }

  const generateChart = ctx => {
    ctx.height = 200;
    ctx.width = 200;
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        position: "top",
        text: "Stock Performance",
        fontSize: 14,
        fontColor: "#111"
      }
    };

    //line chart data
    const data = {
      labels: ["", "", "", "", ""],
      datasets: [
        {
          label: symbol.toUpperCase(),
          data: [...price]
            .reverse()
            .slice(0, 5)
            .reverse(),
          backgroundColor: gain ? "green" : loss ? "red" : "blue",
          borderColor: gain ? "lightgreen" : loss ? "lightred" : "lightblue",
          fill: false,
          lineTension: 0,
          radius: 5
        }
      ]
    };

    var myLineChart = new Chart(ctx, {
      type: "line",
      data,
      options
    });
  };

  const showGraph = () => {
    let ctx = document.getElementById(symbol).childNodes[0];
    if (!ctx.parentElement.classList.contains("hide")) {
      Array.from(document.getElementsByClassName("chart")).forEach(element => {
        element.classList.add("hide");
      });
    } else {
      Array.from(document.getElementsByClassName("chart")).forEach(element => {
        element.classList.add("hide");
      });
      generateChart(ctx);
      document.getElementById(symbol).classList.remove("hide");
    }
  };

  // const timeDiff = Math.round(props.timeDiff / 1000);
  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td className={gain ? "green" : loss ? "red" : ""}>
        $ {price.slice(-1)}
        {gain && <i className="fas fa-caret-up" />}
        {gain && <span> (+{priceDiff}) </span>}
        {loss && <i className="fas fa-caret-down" />}
        {loss && <span> ({priceDiff}) </span>}
        {nodiff && <i className="fas fa-caret-left" />}
        {nodiff && <i className="fas fa-caret-right" />}
      </td>
      <td className="text-secondary">
        {justUpdated ? <p>Just Now</p> : <p>{props.stock.time}</p>}
        {/* {timeDiff > 5 && timeDiff < 60 && (
          <p className="text-muted">A few seconds ago</p>
        )} */}
      </td>
      <td className="show-chart">
        <span
          onClick={() => {
            showGraph();
          }}
        >
          Show Graph
        </span>
        <StockChart chartid={symbol} />
      </td>
    </tr>
  );
}

export default Stock;
