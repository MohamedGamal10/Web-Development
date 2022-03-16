import "./Login.css";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
/* eslint eqeqeq: 0 */
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //check to see if the fields are not empty
  const login = () => {
    if ((username == "") & (password == "")) {
      return;
    } else {
      // make api call to our backend. we'll leave thisfor later
      axios
        .post("http://localhost:8000/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/home");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  return (
    <div className="wrapper">
        {fetchToken() ? (
          <p>you are logged in</p>
        ) : (
          <form className="form-signin">
            <h3>Sign In</h3>
            <div className="form-group">
              <label>Username</label>
              <input type="text"placeholder="Username" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" className="form-control"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="button" className="btn btn-lg btn-primary btn-block btncolor" onClick={login}>Submit</button>
          </form>
        )}
    </div>
  );
}
