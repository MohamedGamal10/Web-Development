import "./JVRequests.css";
import {Col, Row, Container, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { Modal, Table} from 'react-bootstrap';
import React, { useState } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";

export default function JVRequests () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [siteid, setsiteid] = useState("");
    const [datefrom, setdatefrom] = useState("");
    const [dateto, setdateto] = useState("");

    const [siteid_new, setsiteid_new] = useState("");
    const [visitdate, setvisitdate] = useState("");
    const [done, setdone] = useState("");
    const [comment, setcomment] = useState("");

    const [Data,setData] = useState([]);

    const  handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post("http://"+Server_IP+":"+Server_PORT+"/insert_jvrequests", {
            Site_ID: siteid_new, Visit_Date: visitdate, Done: done,
            Comment: comment
        })
        .then(function (response) {
          
          if (!response.data.message) {

            alert("Error")
          }
          else{
              alert(response.data.message)
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
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
                "http://"+Server_IP+":"+Server_PORT+"/getjv_requests",
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
    }
    const Delete = (id,e) => {
        e.preventDefault();
        axios.delete("http://"+Server_IP+":"+Server_PORT+"/delete_jvrequests/"+id)
        .then(res=>{
            alert(res.data.Message)
        }).catch(res=>alert(res.data))
    }
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
                    <Form.Group controlId="Date">
                        <Form.Label>Visit Date</Form.Label>
                        <Form.Control type="Date" placeholder="Visit Date" onChange={(e) => setvisitdate(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Group controlId="Done">
                        <Form.Select aria-label="Done" onChange={(e) => setdone(e.target.value)}>
                            <option>Done</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </Form.Select>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group controlId="Power">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={5}  onChange={(e) => setcomment(e.target.value)}/>
                    </Form.Group>

                </Row>

                
                <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                </Form>
            </Modal.Body>
            </Modal>
        </>
    <div className="Summary-Text">
        <h3>JV Requests</h3>
        
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
    <div>
        <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Site ID</th>
                    <th>Visit Date</th>
                    <th>Done(Y/N)</th>
                    <th>Comment</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {Data.map(item => 
                <tr key={item.Id}>
                    <td>{item.Site_ID}</td>
                    <td>{item.Visit_Date}</td>
                    <td>{item.Done}</td>
                    <td>{item.Comment}</td>
                    <td>
                    <a onClick={(e)=> Delete(item._id,e)}><Icon icon="ant-design:delete-outlined"  width="25"/></a>
                    </td>
                </tr>
               )}
                </tbody>
            </Table>  
        </div>
    </Container>
    </div>
    );
  }
