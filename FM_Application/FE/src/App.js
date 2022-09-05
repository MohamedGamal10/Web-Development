import './App.css';
import { Routes, Route } from "react-router-dom";
import { RequireToken } from "./components/Auth";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Summary from './components/Summary/Summary'
import Bg from './components/bg/bg'
import PowerMeterReadings from './components/PowerMeterReadings/PowerMeterReadings';
import JVRequests from './components/JVRequests/JVRequests';
import ExchangeAccess from './components/ExchangeAccess/ExchangeAccess';
import SparePartsRequests from './components/SparePartsRequests/SparePartsRequests';
import users from './components/Users/Users';

function App() {

  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route path="/home/*" element = {<RequireToken><Home/></RequireToken>}>
            <Route path="main" element = {<Bg/>}/>
            <Route path="summary" element = {<Summary/>}/>
            <Route path="powermeterreadings" element = {<PowerMeterReadings/>}/>
            <Route path="jvrequests" element = {<JVRequests/>}/>
            <Route path="exchangeaccess" element = {<ExchangeAccess/>}/>
            <Route path="sparepartsrequests" element = {<SparePartsRequests/>}/>
            <Route path="users" element = {<users/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
