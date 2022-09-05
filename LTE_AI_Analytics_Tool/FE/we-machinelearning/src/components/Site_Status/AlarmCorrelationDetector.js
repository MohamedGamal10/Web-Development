import "bootstrap/dist/css/bootstrap.min.css";
import "./AlarmCorrelationDetector.css"
import React, { Component } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";
export default class AlarmCorrelationDetector extends Component{
	state={
		detector:[],
	}
	
	  componentDidMount(){
		axios
		.post("http://"+Server_IP+":"+Server_PORT+"/site-mba", {
		  Site_Name_input: this.props.sitename
		})
		.then(function (response) {
		  let detector = response.data;
		  this.setState({ detector });
		  console.log(detector)
	
		}.bind(this))
		.catch(function (error) {
		  console.log(error, "error");
		});
	
	  }
	
render() {
  return (
      
    <div className="subalarm">
            <h3>{this.props.sitename} Alarm Correlation Detector</h3>
			<table className="table table-striped table-hover border">
				<thead>
					<tr>
						<th>Alarms</th>
						<th>Percentage %</th>
						
					</tr>
				</thead>
				<tbody>
				{this.state.detector.map(site =>(
					<tr key={site.itemsets}>
		
                        <td>{site.itemsets}</td>
                        <td>{site.support}</td>
    
					</tr>
				))}
				</tbody>
			</table>
        </div>
    
  );
}

}

