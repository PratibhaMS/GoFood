import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handledSubmit = async (e) => {
    // what is synthetic event
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      alert("Enter Valid Credentials");
    }
  };
  const handledOnChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="container">
        <form onSubmit={(e) => handledSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={(e) => handledOnChange(e)}
              aria-describedby="nameHelp"
            />
            <div id="nameHelp" className="form-text"></div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={(e) => handledOnChange(e)}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={(e) => handledOnChange(e)}
              value={credentials.password}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={credentials.location}
              onChange={(e) => handledOnChange(e)}
              aria-describedby="locationHelp"
            />
            <div id="locationHelp" className="form-text"></div>
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-primary">
            Login
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
