import { useLocation } from "react-router-dom";
export default function Product(props) {
  const location = useLocation();
  function handleAdd() {
    const cartContainer = document.querySelector(".cart");
    cartContainer.style.display = "block";
    props.setShoppingCart((prevArray) => {
      if (prevArray.length == 0) {
        return [{ ...location.state, score: location.state.score + 1 }];
      }
      let found = false;
      const newArray = [];
      for (let i = 0; i < prevArray.length; i++) {
        const oldObj = prevArray[i];
        if (oldObj.name === location.state.name) {
          newArray.unshift({ ...location.state, score: oldObj.score + 1 });
          found = true;
        } else {
          newArray.push(oldObj);
        }
      }
      if (found === false)
        newArray.push({ ...location.state, score: location.state.score + 1 });
      return newArray;
    });
  }
  return (
    <>
      <div className="product margin">
        <div className="product-top">
          <div id="wrap">
            <div id="album">
              <div
                id="cover"
                style={{
                  backgroundImage: `url('${location.state.albumCover}')`,
                }}
              ></div>
              <div id="vinyl"></div>
            </div>
          </div>
          <div className="flex">
            <small>ALBUM</small>
            <h1>{location.state.name}</h1>
            <div>
              <img className="logo-profile" src={location.state.logo} alt="" />{" "}
              <h3>{location.state.artistName}</h3>
            </div>
          </div>
        </div>

        <div className="product-bottom">
          <h3>$19.99</h3>
          <hr />
          <button className="addtocart" onClick={handleAdd}>
            <div className="pretext">ADD TO CART</div>
          </button>
        </div>
      </div>
    </>
  );
}
