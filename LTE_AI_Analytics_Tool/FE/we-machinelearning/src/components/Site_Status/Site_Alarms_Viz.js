import "./Site_Alarms_Viz.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class Site_Alarms_Viz extends Component {
  state={
    alarmsviz:[],
}

  componentDidMount(){
    axios
		.post("http://"+Server_IP+":"+Server_PORT+"/site-alarms-viz", {
		  Site_Name_input: this.props.sitename
		})
		.then(function (response) {
		  let alarmsviz = response.data;
		  this.setState({ alarmsviz });
		  console.log(alarmsviz)
	
		}.bind(this))
		.catch(function (error) {
		  console.log(error, "error");
		});

  }

  render() {
    return (
      <div>
        <Plot
          data={this.state.alarmsviz.data}
          layout={this.state.alarmsviz.layout}
          config={{displaylogo: false}}
        />
      </div>
    );
  }
}
