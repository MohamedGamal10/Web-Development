import "./Home.css";
import { NavDropdown,Nav,Navbar,Container} from 'react-bootstrap';
import Card from './Analytics/Card'
import Map from './Analytics/Map'
import KPI from "./Analytics/KPI";
import Clustering from "./Analytics/Clustering";
import Table from "./Analytics/Table"
import axios from "axios";
import React, { useState } from "react";
import { Component } from "react";
import { Button } from "bootstrap";
export default class Home extends Component {
  state={
    counts:[],
}

componentDidMount() {
 
  }
  render() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Analytics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
          <div className="col">
            <Map/>
          </div>
        </div>
        <br></br>
        <div className="col">
          <KPI/>
        </div>

        <div className="col">
          <Clustering/>
        </div>
        <div className="row margin top">
            
        </div>
      </div>
  );
}}
