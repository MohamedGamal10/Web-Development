import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class Clustering extends Component {
  state={
    Cluster:[],
    Cluster_centroid:[],
    Date:"",
}

  componentDidMount(){

  }
  
  render() {
    const Cluster = (e) => {
        e.preventDefault();
        const data = {
          Date:this.state.Date
        };
        const headers = { 'header-name': 'value' };
        const config = { headers, };
        axios
            .post(
                "http://"+Server_IP+":"+Server_PORT+"/sites_clustering",
                data,
                config,
            )
            .then((response) => {
              let Cluster = response.data;
              this.setState({ Cluster });
            })
            .catch((e) => console.log('something went wrong :(', e));

            axios
            .post(
              "http://"+Server_IP+":"+Server_PORT+"/sites_clustering_centroids",
                data,
                config,
            )
            .then((response) => {
              let Cluster_centroid = response.data;
              this.setState({ Cluster_centroid });
            })
            .catch((e) => console.log('something went wrong :(', e));
    
      };

      const Download = (e) => {
        e.preventDefault();
        const data = {
            Date:this.state.Date
        };
        const headers = { 'header-name': 'value' };
        const config = { headers, };
        axios
            .post(
                "http://"+Server_IP+":"+Server_PORT+"/sites_clustering_download",
                data,
                config,
            )
            .then((response) => {
              console.log(response.data)
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'export.csv'); //or any other extension
              document.body.appendChild(link);
              link.click();
            })
            .catch((e) => console.log('something went wrong :(', e));

    
      };
    return (

      <div>
        <br></br>
        <br></br>
        <h2 style={{"margin-right":'70%'}}>Sites Clustering</h2>
        <br></br>
        <br></br>
        <Form style={{"margin-left":'5%'}}>
        <Row className="mb-3" style={{width:'90%'}}>

            <Form.Group as={Col} xs={3} >
            <Form.Control type="datetime-local" value={this.state.value} onChange={(e) =>this.setState({Date: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col}>
            <Button type="submit" onClick={Cluster}>
                Cluster
            </Button>
            </Form.Group>

            <Form.Group as={Col}>
            <Button type="submit" onClick={Download}>
                Download
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
          data={this.state.Cluster.data}
          layout={this.state.Cluster.layout}
          config={{displaylogo: false}}
        />

       {/*  <Plot
          data={this.state.Cluster_centroid.data}
          layout={this.state.Cluster_centroid.layout}
          config={{displaylogo: false}}
        />*/} 
        
      </div>
    );
  }
}
