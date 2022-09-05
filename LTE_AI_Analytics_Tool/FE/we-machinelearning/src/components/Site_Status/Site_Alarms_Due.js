import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class Site_Alarms_Due extends Component {
  state={
    alarmsdue:[],
}

  componentDidMount(){
    axios
		.post("http://"+Server_IP+":"+Server_PORT+"/site-alarms-duration", {
		  Site_Name_input: this.props.sitename
		})
		.then(function (response) {
		  let alarmsdue = response.data;
		  this.setState({ alarmsdue });
		  console.log(alarmsdue)
	
		}.bind(this))
		.catch(function (error) {
		  console.log(error, "error");
		});

  }

  render() {
    return (
      <div>
        <Plot
          data={this.state.alarmsdue.data}
          layout={this.state.alarmsdue.layout}
          config={{displaylogo: false}}
        />
      </div>
    );
  }
}
