import "./Main.css";
import Logo from '../images/logo.png'
import {Button, Form} from 'react-bootstrap';
import { useNavigate } from "react-router";
import Home from './Home'
import Site from './Site_Status/Site'
import Incident_Home from './Incident/Incident_Home'
import We_Incident from './Incident/We_Incident'
import We_Incident_Analytics from './Incident/We_Incident_Analytics'
import Etisalat_Incident from './Incident/Etisalat_Incident'
import Etisalat_Incident_Analytics from './Incident/Etisalat_Incident_Analytics'
import Insert_We_Incident from './Incident/Insert_WE_Incident';
import Insert_Etisalat_Incident from './Incident/Insert_Etisalat_Incident';
import BatteryMap from "./Battery_Status/BatteryMap";
import Complaints_Home from "./Complaints/Complaints_Home";
import Add_Complaints from './Complaints/Add_Complaints'
import { Routes, Route, Link } from 'react-router-dom';
import Users from "./Users/Users";
export default function Main () {
    const navigate = useNavigate();
    const signOut = () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("Role");
      navigate("/");
    };

    const Role_Analytics = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Analytics")||Role.includes("Admin") ||Role.includes("All")){
          return true
        }
        else{
          return false
        } 
      }
    
      const Role_Site_Status = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Site_Status")||Role.includes("Admin") ||Role.includes("All")){
          return true
        }
        else{
          return false
        } 

      }

      const Role_Incedient = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Incedient")||Role.includes("Admin") ||Role.includes("All")){
          return true
        }
        else{
          return false
        } 
      }

      const Role_Complaints = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Complaints")||Role.includes("Admin") ||Role.includes("All")){
          return true
        }
        else{
          return false
        } 
      }

      const Role_Battery = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Battery")||Role.includes("Admin") ||Role.includes("All")){
          return true
        }
        else{
          return false
        } 
      }

      const Role_Users = ()=>{
        var Role = sessionStorage.getItem('Role')
        if (Role.includes("Admin")){
          return true
        }
        else{
          return false
        } 
      }

  return (
    <div>
        <nav className="sidebar">
        <header>
            <div>
            <img src={Logo} alt="logo"/>
            </div>

        </header>

        <div className="menu-bar">
            <div className="menu">
                <div className="bottom-content">

                {Role_Analytics() ? (
                     <li className="">
                     <Link to="/main/home">
                         <i className='bx bx-home-alt icon' ></i>
                         <span className="text nav-text">Analytics</span>
                     </Link>
                 </li>
                ) : (
                   <br></br>
                )}

                {Role_Site_Status() ? (
                <li className="">
                    <Link to="/main/site">
                        <i className='bx bx-station icon' ></i>
                        <span className="text nav-text">Site Status</span>
                    </Link>
                    
                </li>
                ) : ( 
                <br></br>
                )}

                {Role_Incedient() ? (
                <li className="">
                    <Link to="/main/Incident">
                        <i className='bx bx-data icon' ></i>
                        <span className="text nav-text">Incident</span>
                    </Link>
                </li>
                ) : ( 
                    <br></br>
                    )}
                
                {Role_Complaints() ? (
                <li className="">
                    <Link to="/main/complaints">
                        <i className='bx bx-male icon' ></i>
                        <span className="text nav-text">Rare complaints</span>
                    </Link>
                    
                </li>
                ) : ( 
                    <br></br>
                    )}

                {Role_Battery() ? (
                <li className="">
                    <Link to="/main/battery">
                        <i className='bx bxs-battery-charging icon' ></i>
                        <span className="text nav-text">Battery Status</span>
                    </Link>
                    
                </li>
                ) : ( 
                    <br></br>
                    )}

                {Role_Users() ? (
                <li className="">
                    <Link to="/main/users">
                        <i className='bx bx-user icon' ></i>
                        <span className="text nav-text">Users</span>
                    </Link>
                    
                </li>
                ) : ( 
                    <br></br>
                    )}
            </div>
            </div>

            <div className="bottom-content">
                <li className="">
                    <a href="#" onClick={signOut}>
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
            </div>
        </div>
    </nav>

    <div className="home">
        <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/site" element={<Site/>} />
            <Route path="Incident/" element = {<Incident_Home/>}/>
            <Route path="battery/" element = {<BatteryMap/>}/>
            <Route path="users/" element = {<Users/>}/>
            <Route path="complaints/" element = {<Complaints_Home/>}/>
            <Route path="complaints/Add_Complaints" element = {<Add_Complaints/>}/>
            <Route path="Incident/We_Incident/" element = {<We_Incident/>}/>
            <Route path="Incident/We_Incident_Analytics/" element = {<We_Incident_Analytics/>}/>
            <Route path="Incident/We_Insert_Incident/" element = {<Insert_We_Incident/>}/>
            <Route path="Incident/Etisalat_Incident/" element = {<Etisalat_Incident/>}/>
            <Route path="Incident/Etisalat_Incident_Analytics/" element = {<Etisalat_Incident_Analytics/>}/>
            <Route path="Incident/Etisalat_Insert_Incident/" element = {<Insert_Etisalat_Incident/>}/>
        </Routes>
    </div>

    </div>
  );
}