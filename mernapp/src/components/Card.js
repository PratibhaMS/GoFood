import { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = ({ cardData }) => {
  // console.log(cardData);
  const dispatch = useDispatchCart();
  const data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const { _id, name, img, options } = cardData;
  const option = options[0];
  const priceOptions = Object.keys(option);
  // console.log(priceOptions);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  const finalPrice = qty * parseInt(option[size]);
  const handledAddToCart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === _id) {
        food = item;
        break;
      }
    }
    if (!food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: _id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: _id,
          name: name,
          qty: qty,
          size: size,
          img: img,
          price: finalPrice,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: _id,
      name: name,
      qty: qty,
      size: size,
      img: img,
      price: finalPrice,
    });
  };
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={img}
          className="card-img-top"
          alt="cardImg"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">{finalPrice}</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handledAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
