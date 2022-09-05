import "./SiteKpi.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import {Button,Form,Row,Col} from 'react-bootstrap';
import Plot from "react-plotly.js";
import axios from "axios";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class SiteKpi extends Component {
  state={
    sitekpi:[],
    cellsname:[],
    cellnameselected:"",
    cellkpi:[],
}

  componentDidMount(){
    axios
		.post("http://"+Server_IP+":"+Server_PORT+"/site-kpi", {
		  Site_Name_input: this.props.sitename
		})
		.then(function (response) {
		  let sitekpi = response.data;
		  this.setState({ sitekpi });

		}.bind(this))
		.catch(function (error) {
		  console.log(error, "error");
		});

    axios
		.post("http://"+Server_IP+":"+Server_PORT+"/site-cells", {
		  Site_Name_input: this.props.sitename
		})
		.then(function (response) {
		  let cellsname = response.data;
		  this.setState({ cellsname });
      
		}.bind(this))
		.catch(function (error) {
		  console.log(error, "error");
		});

  }

  render() {
    const Search = (e) => {
      e.preventDefault();
      const data = {
        Cell_Name_input: this.state.cellnameselected
      };
      const headers = { 'header-name': 'value' };
      const config = { headers, };
      axios
          .post("http://"+Server_IP+":"+Server_PORT+"/cell-kpi",
              data,
              config,
          )
          .then((response) => {
            let cellkpi = response.data;
            this.setState({ cellkpi });
          })
          .catch((e) => console.log('something went wrong :(', e));
        }
    return (
      <div>
        <Plot
          data={this.state.sitekpi.data}
          layout={this.state.sitekpi.layout}
          config={{displaylogo: false}}
        />
        <br></br>
        <br></br>
        <br></br>
        <Form className="margin" style={{width:'650px'}}>
              <Row>
                <Col>
                  <b>Cells KPI </b>
                </Col>
                <Col>
                <Form.Select  value={this.state.value} onChange={(e) =>this.setState({cellnameselected: e.target.value})}>
                  <option >Select Cell</option>
                  {this.state.cellsname.map((option) => (
                        <option value={option.cellname}>{option.cellname}</option>
                      ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Button onClick={Search}>Search</Button>
                </Col>
              </Row>
            </Form>
            <br></br>
            <Plot
            data={this.state.cellkpi.data}
            layout={this.state.cellkpi.layout}
            config={{displaylogo: false}}
          />
      </div>
    );
  }
}


