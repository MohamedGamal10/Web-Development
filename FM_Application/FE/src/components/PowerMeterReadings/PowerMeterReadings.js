import "./PowerMeterReadings.css";
import Hcard from "./Hcard";
import {Col, Row, Container, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { Modal} from 'react-bootstrap';
import React, { useState } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";

export default function PowerMeterReadings () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [siteid, setsiteid] = useState("");
    const [datefrom, setdatefrom] = useState("");
    const [dateto, setdateto] = useState("");

    const [siteid_new, setsiteid_new] = useState("");
    const [vendor_new, setvendor_new] = useState("");
    const [readingnumber_new, setreadingnumber_new] = useState("");
    const [date_new, setdate_new] = useState("");
    const [power_new, setpower_new] = useState("");
    const [cash_new, setcash_new] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);


    const [Data,setData] = useState([]);

    const  handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        try {
          axios({
            method:"post",
            url: "http://"+Server_IP+":"+Server_PORT+"/insert_reading_meter",
            data: formData, params: {
                Site_ID: siteid_new, Vendor: vendor_new, Reading_Number: readingnumber_new,
                 Date: date_new, Power: power_new, Cash:cash_new
                
              },
            headers: { "Content-Type": "multipart/form-data" },
          }).then(
            alert("Done")
            )
        .catch(function (error) {
            if (error.response) {
              alert("Undefined Input")
            }
          });
          } catch(error) {
          alert(error)
        }
        
      }
    
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }


    const Search = (e) => {
        e.preventDefault();
        const data = {
            Site_ID: siteid,
            Date_From:datefrom,
            Date_To:dateto
        };
        const headers = { 'header-name': 'value' };
        const config = { headers, };
        axios
            .post(
                "http://"+Server_IP+":"+Server_PORT+"/getsiteinfo",
                data,
                config,
            )
            .then((response) => {
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                  alert("Undefined Input")
                }
              });
    };

 
    return (
        <div>
           
            <Container>
                    <>
                    <Modal show={show} onHide={handleClose} fullscreen='sm-down' dialogClassName="my-modal">
                    
                    <Modal.Header closeButton>
                        <Modal.Title>Add New</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Row className="mb-3">

                            <Form.Group controlId="Case">
                                <Form.Control type="text" placeholder="Site ID" onChange={(e) => setsiteid_new(e.target.value)}/>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Vendor">
                                <Form.Select aria-label="Vendor" onChange={(e) => setvendor_new(e.target.value)}>
                                    <option>Vendor</option>
                                    <option value="Nokia">Nokia</option>
                                    <option value="Huawei"> Huawei</option>
                                </Form.Select>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Date">
                                <Form.Control type="text" placeholder="Reading Number" onChange={(e) => setreadingnumber_new(e.target.value)}/>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Date">
                                <Form.Control type="Date" onChange={(e) => setdate_new(e.target.value)}/>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Power">
                                <Form.Control type="text" placeholder="Power Consumption" onChange={(e) => setpower_new(e.target.value)}/>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Power">
                                <Form.Control type="text" placeholder="Cash" onChange={(e) => setcash_new(e.target.value)}/>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="Power">
                                <Form.Control type="file" onChange={handleFileSelect}/>
                            </Form.Group>

                        </Row>

                        
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                        </Form>
                    </Modal.Body>
                    </Modal>
                </>
            <div className="Summary-Text">
                <h3>Power Meter Readings</h3>
                
                <div className="SearchPower">
                <Form>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3" controlId="siteid">
                                <Form.Control type="text" placeholder="Enter Site ID" onChange={(e) => setsiteid(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setdatefrom(e.target.value)}>
                                <Form.Control type="date" required/>
                            </Form.Group>
                            <Form.Group className="mb-3"  onChange={(e) => setdateto(e.target.value)}>
                                <Form.Control type="date" required/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Button variant="primary" className="btn btn-secondary my-2 add" onClick={handleShow}><Icon icon="carbon:add-alt"  width="40"/></Button>
                        </Col>
                    </Row>
                    
                    <Button variant="primary" type="submit"  onClick={Search}>
                        Search
                    </Button>
                </Form>
                </div>
            </div>
                <Row className="justify-content-center">
                    <Col xs lg="2"></Col>
                    <Col md="auto">
                    {Data.map(item =>(
                        <Hcard _id={item._id} Site_ID ={item.Site_ID} Vendor={item.Vendor} ReadingNumber={item.Reading_Number} Date={item.Date} Power={item.Power} Cash={item.Cash} Image_URL={item.Image_URL} />
                        ))}
                        </Col>
                    <Col xs lg="2"></Col>
                </Row>
            </Container>
        </div>
    );
  }
