import "./We_Incident_Analytics.css";
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown,Nav,Offcanvas,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import {Button,Form,Row,Col} from 'react-bootstrap';
import {Server_IP,Server_PORT} from '../Net_Conf'

export default class We_Incident_Analytics extends Component{
  
  state={
    we_incedient_events_count:[],
    we_incedient_event_per_quarter:[],
    we_incedient_area:[],
    we_incedient_category:[],
    we_incedient_repeatative:[],
    we_incedient_sla:[],
    Quarter:"",
    year:""
}
 

  
componentDidMount(){
    axios
    .get("http://"+Server_IP+":"+Server_PORT+"/we_incident_event_counts")
    .then(function (response) {
      let we_incedient_events_count = response.data;
      this.setState({ we_incedient_events_count });

    }.bind(this))
    .catch(function (error) {
      console.log(error, "error");
    });
}

  render(){
    const Search = (e) => {
      e.preventDefault();
      const data = {
        Quarter:this.state.Quarter.split(',').map(Number) , year:this.state.year
      };
      const headers = { 'header-name': 'value' };
      const config = { headers, };
      axios
          .post("http://"+Server_IP+":"+Server_PORT+"/we_incedient_event_per_quarter",
              data,
              config,
          )
          .then((response) => {
            let we_incedient_event_per_quarter = response.data;
            this.setState({ we_incedient_event_per_quarter });
          })
          .catch((e) => console.log('something went wrong :(', e));

          axios
          .post(
            "http://"+Server_IP+":"+Server_PORT+"/we_incedient_area",
              data,
              config,
          )
          .then((response) => {
            let we_incedient_area = response.data;
            this.setState({ we_incedient_area });
          })
          .catch((e) => console.log('something went wrong :(', e));

          axios
          .post(
            "http://"+Server_IP+":"+Server_PORT+"/we_incedient_category",
              data,
              config,
          )
          .then((response) => {
            let we_incedient_category = response.data;
            this.setState({ we_incedient_category });
          })
          .catch((e) => console.log('something went wrong :(', e));

          axios
          .post(
            "http://"+Server_IP+":"+Server_PORT+"/we_incedient_repeatative",
              data,
              config,
          )
          .then((response) => {
            let we_incedient_repeatative = response.data;
            this.setState({ we_incedient_repeatative });
          })
          .catch((e) => console.log('something went wrong :(', e));

          axios
          .post(
            "http://"+Server_IP+":"+Server_PORT+"/we_incedient_sla",
              data,
              config,
          )
          .then((response) => {
            let we_incedient_sla = response.data;
            this.setState({ we_incedient_sla });
          })
          .catch((e) => console.log('something went wrong :(', e));
    };

    return (
      <div>
          <>
            {[false].map((expand) => (
              <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                <Container fluid>
                  <Navbar.Brand href="#">WE-Incedient Analytics</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Incident
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">

                        <NavDropdown title="We Incident" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                            <NavDropdown.Item href="#action3">
                                <Link to="/main/Incident/We_Incident" style={{ textDecoration: 'none' }}>
                                    <span className="text nav-text">Incident</span>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <Link to="/main/Incident/We_Insert_Incident" style={{ textDecoration: 'none' }}>
                                        <span className="text nav-text">Insert Incident</span>
                                  </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <Link to="/main/Incident/We_Incident_Analytics" style={{ textDecoration: 'none' }}>
                                        <span className="text nav-text">Incident Analytics</span>
                                  </Link>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Etisalat Incident" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                        <NavDropdown.Item href="#action3">
                                <Link to="/main/Incident/Etisalat_Incident" style={{ textDecoration: 'none' }}>
                                    <span className="text nav-text">Incident</span>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <Link to="/main/Incident/Etisalat_Insert_Incident" style={{ textDecoration: 'none' }}>
                                        <span className="text nav-text">Insert Incident</span>
                                  </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <Link to="/main/Incident/Etisalat_Incident_Analytics" style={{ textDecoration: 'none' }}>
                                        <span className="text nav-text">Incident Analytics</span>
                                  </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                      
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))}
          </>
          <div>
          <Form className="margin" style={{width:'850px'}}>
              <Row>
                <Col>
                  <b>Select Year & Quarter</b>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Year" value={this.state.value} onChange={(e) => this.setState({year: e.target.value})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3"> 
                <Form.Select id="sector" value={this.state.value} onChange={(e) =>this.setState({Quarter: e.target.value})}>
                  <option value="">Select Quarter</option>
                    <option value="1,2,3">Q1</option>
                    <option value="4,5,6">Q2</option>
                    <option value="7,8,9">Q3</option>
                    <option value="10,11,12">Q4</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                <Button type="submit" onClick={Search}>Search</Button>
                </Col>
              </Row>
            </Form>
          <Plot data={this.state.we_incedient_events_count.data} layout={this.state.we_incedient_events_count.layout} frames={this.state.we_incedient_events_count.frames} config={{displaylogo: false}}/>
            <Plot data={this.state.we_incedient_event_per_quarter.data} layout={this.state.we_incedient_event_per_quarter.layout} frames={this.state.we_incedient_event_per_quarter.frames} config={{displaylogo: false}}/>
            <Plot data={this.state.we_incedient_category.data} layout={this.state.we_incedient_category.layout} frames={this.state.we_incedient_category.frames} config={{displaylogo: false}}/>
            <Plot data={this.state.we_incedient_repeatative.data} layout={this.state.we_incedient_repeatative.layout} frames={this.state.we_incedient_repeatative.frames} config={{displaylogo: false}}/>
            <Plot data={this.state.we_incedient_sla.data} layout={this.state.we_incedient_sla.layout} frames={this.state.we_incedient_sla.frames} config={{displaylogo: false}}/>
            <Plot data={this.state.we_incedient_area.data} layout={this.state.we_incedient_area.layout} frames={this.state.we_incedient_area.frames} config={{displaylogo: false}}/>
            
          </div>
        <div style={{ height: '1000px'}}></div>
      </div>
    );
}}