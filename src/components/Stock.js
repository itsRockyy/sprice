import React from "react";

function Stock(props) {
  // console.log(props.stock.price);

  const { symbol, price } = props.stock;
  const justUpdated = props.justUpdated;
  // const timeDiff = Math.round(props.timeDiff / 1000);

  return (
    <tr>
      <td>{symbol.toUpperCase()}</td>
      <td>$ {price[0]}</td>
      <td>
        {justUpdated ? <p>Just Now</p> : <p>{props.stock.time}</p>}
        {/* {timeDiff > 10 && <p className="text-muted">{timeDiff} seconds ago</p>} */}
      </td>
    </tr>
  );
}

export default Stock;
