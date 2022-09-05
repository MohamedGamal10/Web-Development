import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Site from './components/Site_Status/Site';
import Home from './components/Home';
import Incident_Home from './components/Incident/Incident_Home'
import We_Incident from './components/Incident/We_Incident'
import We_Incident_Analytics from './components/Incident/We_Incident_Analytics'
import Etisalat_Incident from './components/Incident/Etisalat_Incident'
import Etisalat_Incident_Analytics from './components/Incident/Etisalat_Incident_Analytics'
import Insert_We_Incident from './components/Incident/Insert_WE_Incident';
import Insert_Etisalat_Incident from './components/Incident/Insert_Etisalat_Incident';
import BatteryMap from './components/Battery_Status/BatteryMap';
import Complaints_Home from './components/Complaints/Complaints_Home';
import Add_Complaints from './components/Complaints/Add_Complaints'
import { Routes, Route } from "react-router-dom";
import { RequireToken } from "./components/Auth";
import Users from './components/Users/Users';
export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route path="/main/" element = {<RequireToken><Main/></RequireToken>}>
            <Route path="home" element = {<Home/>}/>
            <Route path="site/" element = {<Site/>}/>
            <Route path="Incident/" element = {<Incident_Home/>}/>
            <Route path="battery/" element = {<BatteryMap/>}/>
            <Route path="users" element = {<Users/>}/>
            <Route path="complaints/" element = {<Complaints_Home/>}/>
            <Route path="complaints/Add_Complaints" element = {<Add_Complaints/>}/>
            <Route path="Incident/We_Incident/" element = {<We_Incident/>}/>
            <Route path="Incident/We_Incident_Analytics/" element = {<We_Incident_Analytics/>}/>
            <Route path="Incident/We_Insert_Incident/" element = {<Insert_We_Incident/>}/>
            <Route path="Incident/Etisalat_Incident/" element = {<Etisalat_Incident/>}/>
            <Route path="Incident/Etisalat_Incident_Analytics/" element = {<Etisalat_Incident_Analytics/>}/>
            <Route path="Incident/Etisalat_Insert_Incident/" element = {<Insert_Etisalat_Incident/>}/>
          </Route>
        </Routes>
    </div>
  );
}

