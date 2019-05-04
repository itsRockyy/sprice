import React from "react";

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
  const timeDiff = Math.round(props.timeDiff / 1000);
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
    </tr>
  );
}

export default Stock;
