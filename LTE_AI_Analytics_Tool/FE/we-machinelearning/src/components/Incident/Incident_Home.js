import "./Incident_Home.css";
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown,Nav,Offcanvas,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Incident_Home (){

    return (
      <div>
          <>
            {[false].map((expand) => (
              <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                <Container fluid>
                  <Navbar.Brand href="#">Incedient</Navbar.Brand>
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
          
          </div>
        <div style={{ height: '1000px'}}></div>
      </div>
    );
}