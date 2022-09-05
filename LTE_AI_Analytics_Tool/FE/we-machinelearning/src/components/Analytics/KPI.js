import "./KPI.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class KPI extends Component {
  state={
    NetKpi:[],
    NetKpiComponent:[],
    KPI:""
}

  componentDidMount(){
    

  }

  render() {

    const Forcast = (e) => {
      e.preventDefault();
      const data = {
        KPI:this.state.KPI
      };
      const headers = { 'header-name': 'value' };
      const config = { headers, };
      axios
      .post("http://"+Server_IP+":"+Server_PORT+"/network-kpi",data,config)
      .then(function (response) {
        let NetKpi = response.data;
        this.setState({ NetKpi });
        console.log(NetKpi)

      }.bind(this))
      .catch(function (error) {
        console.log(error, "error");
      });

      axios
      .post("http://"+Server_IP+":"+Server_PORT+"/network-kpi-components",data,config)
      .then(function (response) {
        let NetKpiComponent = response.data;
        this.setState({ NetKpiComponent });
        console.log(NetKpiComponent)

      }.bind(this))
      .catch(function (error) {
        console.log(error, "error");
      });
      
    };
    return (
      <div>
        <br></br>
        <br></br>
        <h2 style={{"margin-right":'70%'}}>Forcasting Network KPI</h2>
        <br></br>
        <br></br>
        <Form style={{"margin-left":'5%'}}>
        <Row className="mb-3" style={{width:'90%'}}>

            <Form.Group as={Col} xs={3} >
                <Form.Select  onChange={(e) =>this.setState({KPI: e.target.value})}>
                  <option >Select KPI</option>
                  <option value='EPM_RRC_SR'>RRC_SR</option>
                  <option value='EPM_ERAB_SR'>ERAB_SR</option>
                  <option value='EPM_UL_Traffic_GB'>UL Traffic</option>
                  <option value='EPM_DL_Traffic_GB'>DL Traffic</option>
                  </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
            <Button type="submit" onClick={Forcast}>
                Forcast
            </Button>
            </Form.Group>

            <Form.Group as={Col}>
            </Form.Group>
            <Form.Group as={Col}>
            </Form.Group>
            <Form.Group as={Col}>
            </Form.Group>
        </Row>

        </Form>
        
        <Plot
          data={this.state.NetKpi.data}
          layout={this.state.NetKpi.layout}
          config={{displaylogo: false}}
        />
        <Plot
          data={this.state.NetKpiComponent.data}
          layout={this.state.NetKpiComponent.layout}
          config={{displaylogo: false}}
        />
      </div>
    );
  }
}
