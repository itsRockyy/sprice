import React from "react";

function Stock(props) {
  // console.log(props.stock.price);

  const { symbol, price } = props.stock;
  const justUpdated = props.justUpdated;

  let gain = false;
  let loss = false;
  let nodiff = false;
  if (price.length > 1) {
    let diff = price.slice(-2, -1) - price.slice(-1);
    gain = diff < 0 && justUpdated;
    loss = diff > 0 && justUpdated;
    nodiff = diff === 0 && justUpdated;
  }
  const timeDiff = Math.round(props.timeDiff / 1000);
  console.log(props.timeDiff);
  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>
        $ {price.slice(-1)}
        {gain && <i className="fas fa-caret-up" />}
        {loss && <i className="fas fa-caret-down" />}
        {nodiff && <i className="fas fa-caret-left" />}
        {nodiff && <i className="fas fa-caret-right" />}
      </td>
      <td>
        {justUpdated ? <p>Just Now</p> : <p>{props.stock.time}</p>}
        {/* {timeDiff > 5 && timeDiff < 60 && (
          <p className="text-muted">A few seconds ago</p>
        )} */}
      </td>
    </tr>
  );
}

export default Stock;
