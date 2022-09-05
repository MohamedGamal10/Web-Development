import {Col, Row, Container, Button, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import { Modal, Table, Navbar} from 'react-bootstrap';
import React, { useState } from "react";
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";

export default function Users () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setemail] = useState("");

    const [email_new, setemail_new] = useState("");
    const [username_new, setusername_new] = useState("");
    const [password_new, setpassword_new] = useState("");
    const [role_new, setrole_new] = useState("");

    const [Data,setData] = useState([]);

    const  handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post("http://"+Server_IP+":"+Server_PORT+"/insert_user", {
            email: email_new, username: username_new, password: password_new, role: role_new,
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
            email: email,
        };
        const headers = { 'header-name': 'value' };
        const config = { headers, };
        axios
            .post(
                "http://"+Server_IP+":"+Server_PORT+"/get_user",
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
        axios.delete("http://"+Server_IP+":"+Server_PORT+"/delete_user/"+id)
        .then(res=>{
            alert(res.data.Message)
        }).catch(res=>alert(res.data))
    }

    const Generate = (e) =>{
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 7;
        var password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
           }
        document.getElementById("New_Password").innerHTML = password;

    }
    return (
        <div>
            <Navbar bg="light">
                <Container>
                <Navbar.Brand href="/main/users">Users</Navbar.Brand>
                </Container>
            </Navbar>
            
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
                        <Form.Control type="text" placeholder="E-mail" onChange={(e) => setemail_new(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group controlId="Case">
                        <Form.Control type="text" placeholder="Username" onChange={(e) => setusername_new(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group controlId="Password">
                        <Row>
                            <Col><Form.Control type="text" placeholder="Password" onChange={(e) => setpassword_new(e.target.value)}/></Col>
                            <Col><a onClick={Generate}><Icon icon="gridicons:create"  width="25"/></a></Col>
                            <Col>
                                <h5 id='New_Password'></h5>
                            </Col>
                        </Row>
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group controlId="Done">
                        <Form.Select aria-label="Done" onChange={(e) => setrole_new(e.target.value)}>
                            <option>Role</option>
                            <option value="Admin">Admin</option>
                            <option value="All">All</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Site_Status">Site_Status</option>
                            <option value="Incedient">Incedient</option>
                            <option value="Complaints">Complaints</option>
                            <option value="Battery">Battery</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                
                <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                </Form>
            </Modal.Body>
            </Modal>
        </>

    <div className="Summary-Text">
        <br></br>
        <div className="SearchPower">
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="siteid">
                        <Form.Control className="mb-3" type="text" placeholder="Enter E-mail" onChange={(e) => setemail(e.target.value)} required/>

                    </Form.Group>
                </Col>

                <Col>
                <Button variant="primary" type="submit"  onClick={Search}>
                    Search
                </Button>
                <Button variant="primary" className="btn btn-secondary my-2 add" onClick={handleShow} style={{'margin':'10%'}}><Icon icon="carbon:add-alt"  width="40"/></Button>

                </Col>
                <Col></Col>
            </Row>
        </Form>
        </div>
    </div>
    <div>
        <br></br>
        <Table striped bordered hover>
                <thead>
                <tr>
                    <th style={{"width": "30%"}}>Email</th>
                    <th style={{"width": "16%"}}>Username</th>
                    <th style={{"width": "16%"}}>Password</th>
                    <th style={{"width": "16%"}}>Role</th>
                </tr>
                </thead>
                <tbody>
                {Data.map(item => 
                <tr key={item.ID}>
                    <td>{item.Email}</td>
                    <td>{item.Username}</td>
                    <td>{item.Password}</td>
                    <td>{item.Role}</td>
                    <td>
                    <a onClick={(e)=> Delete(item.ID,e)}><Icon icon="ant-design:delete-outlined"  width="25"/></a>
                    </td>
                </tr>
               )}
                </tbody>
            </Table>  
        </div>
    </Container>
    <div style={{ height: '1000px'}}></div>
    </div>
    
    );
  }
