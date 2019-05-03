import React from "react";

function Feed(props) {
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
        {props.stocks.map(item => {
          return (
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.price}</td>
              <td>{item.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Feed;
