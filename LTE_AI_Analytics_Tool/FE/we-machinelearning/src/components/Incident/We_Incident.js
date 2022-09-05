import "./We_Incident.css";
import { Table,Modal,Button, Form, Col, Row, NavDropdown,Nav,Offcanvas,Container,Navbar} from 'react-bootstrap';
import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {Server_IP,Server_PORT} from '../Net_Conf'
export default function We_Incident (){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [Event_Date, setEvent_Date] = useState("");
  const [Event_End_Date, setEvent_End_Date] = useState("");
  const [IR_Slogan, setIR_Slogan] = useState("");
  const [Area, setArea] = useState("");
  const [Site, setSite] = useState("");
  const [Node_ID, setNode_ID] = useState("");
  const [Impact, setImpact] = useState("");
  const [Category, setCategory] = useState("");
  const [CR_Violation, setCR_Violation] = useState("");
  const [Data,setData] = useState([]);
  
  const Search = (e) => {
      e.preventDefault();
      const data = {
        Event_Date:Event_Date,
        Event_End_Date:Event_End_Date,IR_Slogan:IR_Slogan
        ,Area:Area,Site:Site,Node_ID:Node_ID,Impact:Impact,Category:Category
        ,CR_Violation:CR_Violation
      };
      const headers = { 'header-name': 'value' };
      const config = { headers, };
      axios
          .post("http://"+Server_IP+":"+Server_PORT+"/incident_select",
              data,
              config,
          )
          .then((response) => {
              setData(response.data)
          })
          .catch((e) => console.log('something went wrong :(', e));

          setEvent_Date("");
          setEvent_End_Date("");
          setIR_Slogan("");
          setArea("");
          setSite("");
          setNode_ID("");
          setImpact("");
          setCategory("");
          setCR_Violation("");
          
  };

  const Delete = (id,e) => {
    e.preventDefault();
    axios.delete("http://"+Server_IP+":"+Server_PORT+"/delete_incident/"+id)
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
      .post("http://"+Server_IP+":"+Server_PORT+"/incedient_csv",
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
                  <Navbar.Brand href="#">WE-Incedient</Navbar.Brand>
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
          <>
            <Modal show={show} onHide={handleClose} fullscreen='sm-down' dialogClassName="my-modal">
              
              <Modal.Header closeButton>
                <Modal.Title>Search</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mb-3">

                    <Form.Group as={Col} controlId="Event_Date">
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control type="datetime-local" onChange={(e) => setEvent_Date(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Event_End_Date">
                      <Form.Label>Event End Date</Form.Label>
                      <Form.Control type="datetime-local" onChange={(e) => setEvent_End_Date(e.target.value)} />
                    </Form.Group>

                  </Row>
                  
                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="IR_Slogan">
                      <Form.Label>IR Slogan</Form.Label>
                      <Form.Control type="text"  placeholder="IR Slogan" onChange={(e) => setIR_Slogan(e.target.value)}/>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="Area">
                      <Form.Label>Area</Form.Label>
                      <Form.Control type="text" placeholder="Area" onChange={(e) => setArea(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Site">
                      <Form.Label>Site</Form.Label>
                      <Form.Control type="text" placeholder="Site" onChange={(e) => setSite(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Node_ID">
                      <Form.Label>Node ID</Form.Label>
                      <Form.Control type="text" placeholder="Node ID" onChange={(e) => setNode_ID(e.target.value)}/>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                  <Form.Group as={Col} controlId="Impact">
                      <Form.Label>Impact</Form.Label>
                      <Form.Control type="text" placeholder="Impact" onChange={(e) => setImpact(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="CR_Violation">
                      <Form.Label>CR Violation</Form.Label>
                      <Form.Control type="text" placeholder="CR Violation" onChange={(e) => setCR_Violation(e.target.value)}/>
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
                <th style={{width:"20%"}}>IR Slogan</th>
                <th style={{width:"10%"}}>N. of sites</th>
                <th style={{width:"20%"}}>Rootcause</th>
                <th style={{width:"20%"}}>Affected Nodes</th>
                <th style={{width:"20%"}}>Area</th>
                <th style={{width:"20%"}}>Site</th>
                <th style={{width:"20%"}}>Event Date</th>
                <th style={{width:"20%"}}>Event Time</th>
                <th style={{width:"20%"}}>Event End Date</th>
                <th style={{width:"20%"}}>End Time</th>
                <th style={{width:"10%"}}></th>
              </tr>
            </thead>
            <tbody>
          {Data.map(item => 
					        <tr key={item.Id}>
                        <td style={{"word-break": "break-all"}}>{item.IR_Slogan}</td>
                        <td style={{"word-break": "break-all"}}>{item.Number_Of_Sites}</td>
                        <td style={{"word-break": "break-all"}}>{item.Rootcause}</td>
                        <td style={{"word-break": "break-all"}}>{item.Affected_Nodes}</td>
                        <td style={{"word-break": "break-all"}}>{item.Area}</td>
                        <td style={{"word-break": "break-all"}}>{item.Site}</td>
                        <td style={{"word-break": "break-all"}}>{item.Event_Date}</td>
                        <td style={{"word-break": "break-all"}}>{item.Event_Time}</td>
                        <td style={{"word-break": "break-all"}}>{item.Event_End_Date}</td>
                        <td style={{"word-break": "break-all"}}>{item.End_Time}</td>
                        <td>
                          <a href="#" className="delete" data-toggle="modal" onClick={(e)=> Delete(item.Id,e)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                          <a href="#" className="Download" data-toggle="modal" onClick={(e)=> Download(item.Id,e)}><i className="material-icons" data-toggle="tooltip" title="Download">&#xe8f4;</i></a>
                        </td>
					         </tr>
                    )}
              
            </tbody>
          </Table>
          <div style={{ height: '1000px'}}></div>
         </div>
    </div>
    );
}