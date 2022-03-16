import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import logo from '../Images/logo.png';
export default function Navbar() {
    const navigate = useNavigate();

    const signOut = () => {
      localStorage.removeItem("mohamed");
      navigate("/");
    };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home"><img src={logo} alt="Logo"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
            <a className="nav-link active" aria-current="page" href="/home/add">Add New</a>
              <a className="nav-link active" aria-current="page" onClick={signOut} href="/">Sign out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
