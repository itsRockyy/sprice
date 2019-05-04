import React from "react";
import Stock from "./Stock";

function Feed(props) {
  const stocksArray = Array.from(props.stockMap.entries()).map(item => {
    return {
      value: item[1],
      justUpdated: props.justUpdatedStocks.indexOf(item[0]) !== -1
      // timeDiff: Date.now() - item[1].date
    };
  });
  console.log("stocksArray", stocksArray);

  return (
    <table className="table" style={{ textAlign: "center" }}>
      <thead className="thead-dark">
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
        {stocksArray.map(item => {
          return (
            <Stock
              key={item.value.symbol}
              stock={item.value}
              justUpdated={item.justUpdated}
              // timeDiff={item.timeDiff}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Feed;
