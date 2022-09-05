import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import {Button,Form,Row,Col} from 'react-bootstrap';
import { NavDropdown,Nav,Navbar,Container} from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import "./BatteryMap.css";
import {Server_IP,Server_PORT} from '../Net_Conf'
export default function BatteryMap () {
  const [geo, setgeo] = useState([]);
  const [sector, setsector] = useState("");
 
  const Search = (e) => {
    e.preventDefault();
  const data = {
    sector_input:sector
  };
  const headers = { 'header-name': 'value' };
  const config = { headers, };
  axios
      .post(
        "http://"+Server_IP+":"+Server_PORT+"/battary_status",
          data,
          config,
      )
      .then(function (response) {
        let geo = response.data;
        setgeo(geo);
    
      }.bind(this))
      .catch(function (error) {
        console.log(error, "error");
      });
  
}
 //green 008000
    //red 	ff0000
    // orange 	ffa500


    return (
        
      <div>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Battery Status</Navbar.Brand>
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
        <Form className="margin" style={{width:'650px'}}>
              <Row>
                <Col>
                <Form.Select id="sector" onChange={(e) => setsector(e.target.value)}>
                    <option value="">Select Sector</option>
                    <option value="all">All</option>
                    <option value="قطاع_مناطق_القاهرة_الجديدة">قطاع مناطق القاهرة الجديدة</option>
                    <option value="قطاع_شرق_القاهرة">قطاع شرق القاهرة</option>
                    <option value="قطاع_غرب_القاهرة">قطاع غرب القاهرة</option>
                    <option value="قطاع_الجيزة">قطاع الجيزة</option>
                    <option value="قطاع_الأسكندريه">قطاع الأسكندريه</option>
                    <option value = "قطاع_الساحل_الشمالى_ومطروح">قطاع الساحل الشمالى ومطروح</option>
                    <option value = "قطاع_الاسماعيلية_وشمال_سيناء">قطاع الاسماعيلية وشمال سيناء</option>
                    <option value = "قطاع_السويس">قطاع السويس</option>
                    <option value = "قطاع_شمال_الصعيد">قطاع شمال الصعيد</option>
                    <option value = "قطاع_وسط_الصعيد">قطاع وسط الصعيد</option>
                    <option value = "قطاع_جنوب_الصعيد">قطاع جنوب الصعيد</option>
                    <option value = "قطاع_شرق_الدلتا">قطاع شرق الدلتا</option>
                    <option value = "قطاع_وسط_الدلتا">قطاع وسط الدلتا</option>
                    <option value = "قطاع_غرب_الدلتا">قطاع غرب الدلتا</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Button onClick={Search}>Search</Button>
                </Col>
              </Row>
            </Form>
            <br></br>
            <Container>
        <Row>
          <Col>
              <MapContainer center={[27.180134, 31.189283]} zoom={6} className="SiteMapStyleall">
                <TileLayer
                  attribution="&copy; contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geo.map(site =>(      
                <Marker key = {site.Site_ID} position={[site.Lat, site.Long]}  icon={L.icon({iconUrl:'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+ site.colorcode+'&chf=a,s,ee00FFFF'})}>
                  <Popup>
                    {site.Site_ID}
                  </Popup>
                </Marker>
                
              ))}
              </MapContainer>
          </Col>
      </Row>  
      </Container>
      <div style={{ height: '1000px'}}></div>
    </div>
    );
  }
