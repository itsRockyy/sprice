import React from "react";

function StockChart(props) {
  return (
    <div id={props.chartid} className="chart hide">
      <canvas
        height="200"
        width="200"
        style={{ border: "solid 1px #dee2e6" }}
      />
    </div>
  );
}

export default StockChart;
