import "./Etisalat_Incident.css";
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown,Nav,Offcanvas,Container,Table,Modal,Button, Form, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default function Etisalat_Incident (){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Case, setCase] = useState("");
  const [Description, setDescription] = useState("");
  const [Etisalat_Notification_Time, setEtisalat_Notification_Time] = useState("");
  const [Etisalat_Feedback, setEtisalat_Feedback] = useState("");
  const [Resolution_Time, setResolution_Time] = useState("");
  const [Violated, setViolated] = useState("");
  const [Comments, setComments] = useState("");
  const [Data,setData] = useState([]);
  
  const Search = (e) => {
      e.preventDefault();
      const data = {
        Date:Date,Case:Case,Description:Description,Etisalat_Notification_Time:Etisalat_Notification_Time,
        Etisalat_Feedback:Etisalat_Feedback,Resolution_Time:Resolution_Time,
        Violated:Violated,Comments:Comments
      };
      const headers = { 'header-name': 'value' };
      const config = { headers, };
      axios
          .post(
            "http://"+Server_IP+":"+Server_PORT+"/etisalat_incident_cases_select",
              data,
              config,
          )
          .then((response) => {
              setData(response.data)
          })
          .catch((e) => console.log('something went wrong :(', e));

          setCase("");
          setDescription("");
          setEtisalat_Notification_Time("");
          setEtisalat_Feedback("");
          setResolution_Time("");
          setViolated("");
          setComments("");

  };

  const Delete = (id,e) => {
    e.preventDefault();
    axios.delete("http://"+Server_IP+":"+Server_PORT+"/delete_etisalat_incident_Cases/"+id)
    .then(res=>{
        alert(res.data)
    }).catch(res=>alert(res.data))
}

const Download = (Id,e) => {
  e.preventDefault();
  const data = {
    Id:Id
  };
  const headers = { 'header-name': 'value' };
  const config = { headers, };
  axios
      .post("http://"+Server_IP+":"+Server_PORT+"/incedient_csv_Etisalat_Cases/",
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
          <>
            {[false].map((expand) => (
              <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                <Container fluid>
                  <Navbar.Brand href="#">Etisalat-Incedient</Navbar.Brand>
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
                                <Link to="/main/Incident/We_Incident_Analytics" style={{ textDecoration: 'none' }}>
                                        <span className="text nav-text">Incident Analytics</span>
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
        <div className="container">
          <>
            <Modal show={show} onHide={handleClose} fullscreen='sm-down' dialogClassName="my-modal">
              
              <Modal.Header closeButton>
                <Modal.Title>Search</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mb-3">

                    <Form.Group as={Col} controlId="Case">
                      <Form.Label>Case</Form.Label>
                      <Form.Control type="text" placeholder="Case" onChange={(e) => setCase(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                  </Row>

                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="Etisalat_Notification_Time">
                      <Form.Label>Etisalat Notification Time</Form.Label>
                      <Form.Control type="datetime-local" placeholder="Etisalat Notification Time" onChange={(e) => setEtisalat_Notification_Time(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Resolution_Time">
                      <Form.Label>Resolution Time</Form.Label>
                      <Form.Control type="datetime-local"  placeholder="Resolution Time" onChange={(e) => setResolution_Time(e.target.value)}/>
                    </Form.Group>
                    
                  </Row>
                  
                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="Violated">
                      <Form.Label>Violated</Form.Label>
                      <Form.Control type="text" placeholder="Violated" onChange={(e) => setViolated(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Comments">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control type="text" placeholder="Comments" onChange={(e) => setComments(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Etisalat_Feedback">
                      <Form.Label>Etisalat Feedback</Form.Label>
                      <Form.Control type="text" placeholder="Etisalat Feedback" onChange={(e) => setEtisalat_Feedback(e.target.value)}/>
                    </Form.Group>
                  </Row>

                  
                  <Button variant="primary" type="submit" onClick={Search}>Search</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </>
          <Row>
          <Button variant="primary" className="btn btn-secondary my-2 my-sm-0 marginleft" onClick={handleShow}>Search</Button>
          </Row>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width:"20%"}}>Date</th>
                <th style={{width:"30%"}}>Case</th>
                <th style={{width:"20%"}}>Description</th>
                <th style={{width:"20%"}}>Etisalat Notification Time</th>
                <th style={{width:"20%"}}>Etisalat Feedback</th>
                <th style={{width:"20%"}}>Resolution Time</th>
                <th style={{width:"20%"}}>Violated</th>
                <th style={{width:"20%"}}>Comments</th>
                <th style={{width:"10%"}}></th>
              </tr>
            </thead>
            <tbody>
          {Data.map(item => 
					        <tr key={item.Id}>
                        <td>{item.Date}</td>
                        <td style={{"word-break": "break-all"}}>{item.Case}</td>
                        <td style={{"word-break": "break-all"}}>{item.Description}</td>
                        <td style={{"word-break": "break-all"}}>{item.Etisalat_Notification_Time}</td>
                        <td style={{"word-break": "break-all"}}>{item.Etisalat_Feedback}</td>
                        <td style={{"word-break": "break-all"}}>{item.Resolution_Time}</td>
                        <td style={{"word-break": "break-all"}}>{item.Violated}</td>
                        <td style={{"word-break": "break-all"}}>{item.Comments}</td>
                        <td>
                          <a href="#" className="delete" data-toggle="modal" onClick={(e)=> Delete(item.Id,e)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                          <a href="#" className="Download" data-toggle="modal" onClick={(e)=> Download(item.Id,e)}><i className="material-icons" data-toggle="tooltip" title="Download">&#xe8f4;</i></a>
                        </td>
					         </tr>
                    )}
              
            </tbody>
          </Table>
        </div>     
          
          </div>
        <div style={{ height: '1000px'}}></div>
      </div>
    );
}