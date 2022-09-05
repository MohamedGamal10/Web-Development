import "./Login.css";
import Logo from '../../images/logo-r.png';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../Auth";
import { useState } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
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
			  navigate("/home/main");
			}
			else{
				alert(response.data.message)
			}
		  })
		  .catch(function (error) {
			console.log(error, "error");
		  });
	  }
	};
  
  return (
    <div>
      <div className="container-login">
	<div className="screen">
		<div className="screen__content">
		{fetchToken() ? (
          <h1>you are logged in</h1>
        ) : (
			<form className="login">
				<div className="login__field">
        <Icon icon="ant-design:user-outlined" />
					<input type="text" className="login__input" placeholder="UserName" onChange={(e) => setUsername(e.target.value)}/>
				</div>
				<div className="login__field">
        <Icon icon="carbon:password" />
					<input type="password" className="login__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<button className="button login__submit" type="button" onClick={login}>
					<span className="button__text">Log In</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			)}
			<img className="login__img" src={Logo} alt="...."/>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
  </div>
</div>
  );
}

         