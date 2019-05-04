import React from "react";
import Stock from "./Stock";

function Feed(props) {
  let stocksArray = Array.from(props.stockMap.entries()).map(item => {
    return {
      ticker: item[0],
      value: item[1],
      justUpdated: props.justUpdatedStocks.indexOf(item[0]) !== -1,
      timeDiff: Date.now() - item[1].date
    };
  });
  // console.log("stocksArray", stocksArray);

  stocksArray = stocksArray.sort((a, b) => {
    if (a.ticker < b.ticker) return -1;
    else return 1;
  });

  return (
    <table
      className="table table-sm table-bordered	"
      style={{ textAlign: "center" }}
    >
      <thead className="thead-dark">
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Last Updated</th>
          <th className="mobile-hide">Show Graph</th>
        </tr>
      </thead>
      <tbody>
        {stocksArray.map(item => {
          return (
            <Stock
              key={item.value.symbol}
              stock={item.value}
              justUpdated={item.justUpdated}
              timeDiff={item.timeDiff}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Feed;
