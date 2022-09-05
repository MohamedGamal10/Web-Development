import "./Site.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SiteMap from './SiteMap'
import SiteKpi from './SiteKpi'
import Site_Alarms_Viz from './Site_Alarms_Viz'
import Site_Alarms_Due from './Site_Alarms_Due'
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";
import AlarmCorrelationDetector from "./AlarmCorrelationDetector";
import React, { useState } from "react";
import { format } from 'date-fns'
export default function Site (){
  const [sitename, setsitename] = useState("");
  const [Data,setData] = useState([]);
  const Search = (e) => {
    e.preventDefault();
    const data = {
      Site_Name_input: sitename,
    };
    const headers = { 'header-name': 'value' };
    const config = { headers, };
    axios
        .post("http://"+Server_IP+":"+Server_PORT+"/site",
            data,
            config,
        )
        .then((response) => {
            setData(response.data)
        })
        .catch((e) => console.log('something went wrong :(', e));
};

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Site Status</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link1</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link2</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Link3</a>
                  </li>
                </ul>
                <form className="d-flex">
                  <input className="form-control me-sm-2" type="text" placeholder="Search" onChange={(e) => setsitename(e.target.value)}/>
                  <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={Search}>Search</button>
                </form>
              </div>
            </div>
          </nav>
        <div className="container">
          {Data.map(item =>(
            <React.Fragment key={item.Site_Name}>
          <div className="row">
            <div className="col marginmap">
              <SiteMap sitename={item.Site_Name}/>
            </div>
            <div className="col" style={{width:'500px',marginTop:'8%'}}>
              <p><b>Site Name :</b> {item.Site_Name}</p>
              <p><b>Status :</b> {item.Status}</p>
              <p><b>Subcategory :</b> {item.Subcategory}</p>
              <p><b>Site Type   :</b> {item.Site_Type}</p>
              <p><b>TX Type :</b> {item.TX_Type}</p>
              <p><b>Power Type :</b> {item.Power_Type}</p>
              <p><b>Address :</b> {item.Address}</p>
              <p><b>Change :</b> {item.Change}</p>
            </div>
            <div className="col" style={{width:'500px',marginTop:'8%'}}>
              <p><b>Vendor :</b> {item.Vendor}</p>
              <p><b>Sector :</b> {item.Sector}</p>
              <p><b>Locking Date :</b> {item.Locking_Date}</p>
              <p><b>VIP :</b> {item.VIP}</p>
              <p><b>Sharing Operator :</b> {item.Sharing_Operator}</p>
              <p><b>Sharing Type :</b> {item.Sharing_Type}</p>
              <p><b>Hosting Type :</b> {item.Hosting_type}</p>
              <p><b>SIR :</b> {item.SIR}</p>
            </div>
              
          </div>
          
          <div className="row">
            <SiteKpi sitename={item.Site_Name}/>
          </div>
          <div className="row">
            <Site_Alarms_Viz sitename={item.Site_Name}/>
          </div>
          <div className="row">
            <Site_Alarms_Due sitename={item.Site_Name}/>
          </div>
          <div className="row">
            <AlarmCorrelationDetector sitename={item.Site_Name}/>
          </div>
          </React.Fragment>
          ))}
        </div>
        <div style={{ height: '1000px'}}></div>
      </div>
    );
}