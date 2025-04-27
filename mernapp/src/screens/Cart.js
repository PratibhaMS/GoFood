import { useDispatchCart, useCart } from "../components/ContextReducer";

const Cart = () => {
  const dispatch = useDispatchCart();
  const data = useCart();
  console.log(!data.length);
  if (!data.length) {
    console.log(true);
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  const handledCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
        order_date: new Date().toDateString(),
      }),
    });
    let json = await response.json();
    if (json.success === true) {
      dispatch({ type: "DROP" });
    }
  };
  const totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr className="text-white">
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      style={{ width: "25px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzb1EQddI1Qzm7z-0855CNh3tuE3sePw9FyA&s"
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price:{totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handledCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
