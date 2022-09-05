import { MapContainer, TileLayer, Marker} from "react-leaflet";
import React, { Component } from "react";
import axios from "axios";
import "./SiteMap.css";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class SiteMap extends Component {
  
  state={
    geo:[],
}

  componentDidMount(){
    axios
    .post("http://"+Server_IP+":"+Server_PORT+"/site", {
      Site_Name_input: this.props.sitename
    })
    .then(function (response) {
      let geo = response.data;
      this.setState({ geo });
      console.log(geo)

    }.bind(this))
    .catch(function (error) {
      console.log(error, "error");
    });

  }

  render() {
   
    
    return (
      <div>
      <MapContainer center={[27.180134, 31.189283]} zoom={5} className="SiteMapStyle">
        <TileLayer
          attribution="&copy; contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.geo.map(site =>(
        <Marker key = {site.Site_Name} position={[site.Latitude, site.Longitude]}></Marker>
      ))}
      </MapContainer>
      </div>
      
    );
  }
}
