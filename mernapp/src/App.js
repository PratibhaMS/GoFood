import "./index.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import CartProvider from "./components/ContextReducer.js";
import MyOrder from "./screens/MyOrder.js";

// Username goFood;
// Password goFood123
// mongodb+srv://goFood:goFood@123@cluster0.klat3jl.mongodb.net/
// https://www.youtube.com/watch?v=CRFa9RbYAt0&list=PLI0saxAvhd_OdRWyprSe3Mln37H0u4DAp&index=6
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
