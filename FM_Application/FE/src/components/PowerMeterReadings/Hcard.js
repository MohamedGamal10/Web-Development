import React , { Component } from 'react';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import {Col, Row, Form } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import axios from "axios";

export default class Hcard extends Component {
  
render() {
  const Delete = (id,e) => {
    e.preventDefault();
    axios.delete('http://localhost:8000/delete_reading_meter/'+id)
    .then(res=>{
        alert(res.data.Message)
    }).catch(res=>alert(res.data))
}
  return (
    
    <div>
    <MDBCard style={{ maxWidth: '1000px', minWidth: '1000px'  }}>
      <MDBRow style={{ maxWidth: '1000px', minWidth: '1000px'  }}>
        <MDBCol md='4'>
          <MDBCardImage src= {this.props.Image_URL} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{this.props.ReadingNumber} <b>Reading</b></MDBCardTitle>
            <Row>
                <Col>
                    <Form>
                      <Form.Group className="mb-3">
                            <Form.Label><h4><b>Site ID : </b>{this.props.Site_ID}</h4></Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><h4><b>Vendor : </b>{this.props.Vendor}</h4></Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><h4><b>Date : </b>{this.props.Date}</h4></Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><h4><b>Power : </b>{this.props.Power} Kw</h4></Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><h4><b>Cash : </b>{this.props.Cash} EGP</h4></Form.Label>
                        </Form.Group>
                    </Form>
                </Col>
                   
                <Col>
                    <Col><a onClick={(e)=> Delete(this.props._id,e)}><Icon icon="ant-design:delete-outlined"  width="25"/></a></Col>
                </Col>
            </Row>
                
            
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    <br></br>
    </div>
  );
}
}
