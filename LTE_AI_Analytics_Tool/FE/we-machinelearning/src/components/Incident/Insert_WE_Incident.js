import "./Insert_WE_Incident.css";
import { NavDropdown,Nav,Offcanvas,Container,Navbar} from 'react-bootstrap';
import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {Component} from 'react'; 
import Template from '../../Files/We_Template.xlsx'
import {Server_IP,Server_PORT} from '../Net_Conf'
export default class Insert_We_Incident extends Component{
  state = { 
    // Initially, no file is selected 
    selectedFile: null,
    r:[]
  }; 
  // On file select (from the pop up) 
  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  // On file upload (click the upload button) 
  onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "file", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("http://"+Server_IP+":"+Server_PORT+"/insert_we_incident", formData).then((response) => {
        console.log(response)
        alert(response.data.Message)
    }); 
  }; 


  render() {
  
    return (
      
      <div>
        <>
            {[false].map((expand) => (
              <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                <Container fluid>
                  <Navbar.Brand href="#">Insert WE-Incedient</Navbar.Brand>
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
        <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <input className="form-control form-control-lg fileupload" id="formFileLg" type="file" onChange={this.onFileChange}/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary btnupload" onClick={this.onFileUpload}>Upload</button>
                                    <a href={Template}>Template</a>
                                </div>
                                <div className="col">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="col">
            
                    
                    </div>
          <div style={{ height: '1000px'}}></div>
         </div>
    </div>
    </div>
    );
}}