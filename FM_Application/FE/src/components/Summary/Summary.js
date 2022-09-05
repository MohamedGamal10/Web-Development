import "./Summary.css";
import {Table, Button , Modal , Form} from 'react-bootstrap';
import React, { useState } from 'react';
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";
import Template from '../../files/Template.xlsx'
export default function Summary () {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedFile, setSelectedFile] = useState(null);

  const Download = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    const headers = { "Content-Type": "multipart/form-data" };
    const config = { headers, };
    axios
        .post(
          "http://"+Server_IP+":"+Server_PORT+"/genrate_avg_power_report",
            formData,
            config,
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'export.csv'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((e) => console.log('something went wrong :(', e));
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


    return (
        <div>

          <div className="container">
            <div className="Summary-Text">
            <h1>Summary Report</h1>
            
            <>
              <Button variant="primary" onClick={handleShow}>
                Generate Report
              </Button>
              <br></br>
              <br></br>
              <a href={Template}>DownLoad Template</a>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Generate Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>File input</Form.Label>
                  <Form.Control type="file" onChange={handleFileSelect} />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={Download}>
                    Generate
                  </Button>
                </Modal.Footer>
              </Modal>
            </> 
            
            </div>
        </div>

        </div>
    );
  }
