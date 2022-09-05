import "./Login.css";
import Logo from '../images/logo2.png'
import { useNavigate } from "react-router";
import { setToken } from "./Auth";
import {Server_IP,Server_PORT} from './Net_Conf'
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
  
	//check to see if the fields are not empty
	const login = () => {
	  if ((username === "") & (password === "")) {
		return;
	  } else {
		// make api call to our backend. we'll leave thisfor later
		axios
		  .post("http://"+Server_IP+":"+Server_PORT+"/login", {
			username: username,
			password: password,
		  })
		  .then(function (response) {
			
			if (response.data.token) {
			  setToken(response.data.token, response.data.role);
			  navigate("/main");

			}
			else{
				alert(response.data.message)
			}
		  })
		  .catch(function (error) {
			console.log(error, "error");
		  });
	  }
  }
  return (
    <div>
      <div className="wrapper element">
          <div className="title-text">
            <div className="title login">Login</div>
          </div>
          <div className="form-container">
            <div className="form-inner">
              <form className="login">
                <div className="field">
                  <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="field btn1" type="button" onClick={login}>
                  <span className="button__text">Login</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <img src={Logo} alt="logo" className="logo element"/>
    </div>
  );
}