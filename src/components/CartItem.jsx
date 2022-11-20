import { useState } from "react";

export default function CartItem(props) {
  function handleClick(type) {
    let exception = false;
    if (type === "-") {
      props.setShoppingCart((prevArray) => {
        const test = prevArray.map((obj) => {
          if (obj.name === props.album.name) {
            const newScore = obj.score - 1;
            if (newScore < 1) exception = true;
            return { ...obj, score: newScore };
          } else {
            return obj;
          }
        });
        if (exception) return test.filter((obj) => obj.score >= 1);
        return test;
      });
    } else {
      props.setShoppingCart((prevArray) => {
        return prevArray.map((obj) =>
          obj.name === props.album.name ? { ...obj, score: obj.score + 1 } : obj
        );
      });
    }
  }
  return (
    <div className="cart-item">
      <img src={props.album.albumCover} alt="" className="cart-img" />
      <div className="cart-item-details">
        <p>{props.album.artistName}</p>
        <p>{props.album.name}</p>
        <div className="cart-item-quantity">
          <button onClick={() => handleClick("-")}>-</button>
          <p>{props.album.score}</p>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
      </div>
      <div>$19.99</div>
    </div>
  );
}
