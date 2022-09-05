import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Button,Form,Row,Col} from 'react-bootstrap';
import Card from './Card'
import React, { useState } from "react";
import axios from "axios";
import {Server_IP,Server_PORT} from '../Net_Conf'
import "./Map.css";
export default function Map () {
  const [geo, setgeo] = useState([]);
  const [sector, setsector] = useState("");
  const [Total_Sites, setTotal_Sites] = useState("");
  const [Total_Sites_HUAWEI,setTotal_Sites_HUAWEI] = useState("");
  const [Total_Sites_NOKIA,setTotal_Sites_NOKIA] = useState("");
  const [Total_Sites_FM,setTotal_Sites_FM] = useState("");
  const [Total_Sites_FM_HUAWEI,setTotal_Sites_FM_HUAWEI] = useState("");
  const [Total_Sites_FM_NOKIA,setTotal_Sites_FM_NOKIA] = useState("");
  const [Total_Sites_ROT,setTotal_Sites_ROT] = useState("");
  const [Total_Sites_ROT_HUAWEI,setTotal_Sites_ROT_HUAWEI] = useState("");
  const [Total_Sites_ROT_NOKIA,setTotal_Sites_ROT_NOKIA] = useState("");
  const Search = (e) => {
    e.preventDefault();
  const data = {
    sector_input:sector
  };
  const headers = { 'header-name': 'value' };
  const config = { headers, };
  axios
      .post(
        "http://"+Server_IP+":"+Server_PORT+"/sites-geo_down",
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

      axios
      .post(
        "http://"+Server_IP+":"+Server_PORT+"/counts",
          data,
          config,
      )
      .then(function (response) {
        let counts = response.data;
        setTotal_Sites(counts["Total_Sites"]);
        setTotal_Sites_HUAWEI(counts["Total_Sites_HUAWEI"]);
        setTotal_Sites_NOKIA(counts["Total_Sites_NOKIA"]);
        setTotal_Sites_FM(counts["Total_Sites_FM"]);
        setTotal_Sites_FM_HUAWEI(counts["Total_Sites_FM_HUAWEI"]);
        setTotal_Sites_FM_NOKIA(counts["Total_Sites_FM_NOKIA"]);
        setTotal_Sites_ROT(counts["Total_Sites_ROT"]);
        setTotal_Sites_ROT_HUAWEI(counts["Total_Sites_ROT_HUAWEI"]);
        setTotal_Sites_ROT_NOKIA(counts["Total_Sites_ROT_NOKIA"]);

    
      }.bind(this))
      .catch(function (error) {
        console.log(error, "error");
      });

      
}

    
    return (
      <div>
        <Form className="margin" style={{width:'650px'}}>
              <Row>
                <Col>
                  <b>Down Sites </b>
                </Col>
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
        <Row>
        
          <Col>
            <Row>
            <Col><Card header=" Total Sites" title_total="Total" text_total={Total_Sites}  title_Huawei="Huawei" text_Huawei={Total_Sites_HUAWEI}  title_Nokia="Nokia" text_Nokia={Total_Sites_NOKIA}  className=""/></Col>
            </Row>
            <Row>
            <Col><Card header="FM" title_total="Total" text_total={Total_Sites_FM}  title_Huawei="Huawei" text_Huawei={Total_Sites_FM_HUAWEI}  title_Nokia="Nokia" text_Nokia={Total_Sites_FM_NOKIA} className=""/></Col>
            </Row>  
            <Row>
            <Col><Card header="ROT" title_total="Total" text_total={Total_Sites_ROT}   title_Huawei="Huawei" text_Huawei={Total_Sites_ROT_HUAWEI} title_Nokia="Nokia" text_Nokia={Total_Sites_ROT_NOKIA}   className=""/></Col>
  
            </Row>
          </Col>
          
          <Col>
              <MapContainer center={[27.180134, 31.189283]} zoom={6} className="SiteMapStyleall">
                <TileLayer
                  attribution="&copy; contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geo.map(site =>(
                <Marker key = {site.Site_ID_x} position={[site.Lat, site.Long]}>
                  <Popup>
                    {site.Site_ID_x}
                  </Popup>
                </Marker>
              ))}
              </MapContainer>
          </Col>
      </Row>  
    </div>
    );
  }
