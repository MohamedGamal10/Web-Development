import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import {Nav, Container, Navbar,  Form, Button} from 'react-bootstrap';
import Summary from "../Summary/Summary";
import PowerMeterReadings from '../PowerMeterReadings/PowerMeterReadings'
import JVRequests from "../JVRequests/JVRequests";
import ExchangeAccess from "../ExchangeAccess/ExchangeAccess";
import SparePartsRequests from "../SparePartsRequests/SparePartsRequests"
import Users from "../Users/Users";
import Bg from "../bg/bg"

export default function Home () {
  const navigate = useNavigate();

    const signOut = () => {
      sessionStorage.removeItem("user");
      navigate("/");
    };

    const Role = ()=>{
      var Role = sessionStorage.getItem('Role')
      if (Role ==='Admin'){
        return false
      }
      else{
        return true
      }
      
    }

  return (
    <div>
        {Role() ? (
          <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/home/main">FM DB</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/home/summary">Summary</Nav.Link>
                <Nav.Link as={Link} to="/home/powermeterreadings">Power Meters Readings</Nav.Link>
                <Nav.Link as={Link} to="/home/jvrequests">JV Requests</Nav.Link>
                <Nav.Link as={Link} to="/home/exchangeaccess">Exchange Access</Nav.Link>
                <Nav.Link as={Link} to="/home/sparepartsrequests">Spare Parts Requests</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Button variant="primary" onClick={signOut}>Log out</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        ) : (
            <Navbar bg="dark" expand="lg" variant="dark">
              <Container>
                <Navbar.Brand as={Link} to="/home/main">FM DB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home/summary">Summary</Nav.Link>
                    <Nav.Link as={Link} to="/home/powermeterreadings">Power Meters Readings</Nav.Link>
                    <Nav.Link as={Link} to="/home/jvrequests">JV Requests</Nav.Link>
                    <Nav.Link as={Link} to="/home/exchangeaccess">Exchange Access</Nav.Link>
                    <Nav.Link as={Link} to="/home/sparepartsrequests">Spare Parts Requests</Nav.Link>
                    <Nav.Link as={Link} to="/home/users">Users</Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Button variant="primary" onClick={signOut}>Log out</Button>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
                    )}
    <Routes>
        <Route path="/Summary" element={<Summary/>} />
        <Route path="/powermeterreadings" element = {<PowerMeterReadings/>}/>
        <Route path="/jvrequests" element = {<JVRequests/>}/>
        <Route path="/exchangeaccess" element = {<ExchangeAccess/>}/>
        <Route path="/sparepartsrequests" element = {<SparePartsRequests/>}/>
        <Route path="/main" element={<Bg/>} />
        <Route path="/users" element={<Users/>} />
    </Routes>
    </div>
  );
}