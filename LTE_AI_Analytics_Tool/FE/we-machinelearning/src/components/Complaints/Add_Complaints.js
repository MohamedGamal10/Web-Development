import "bootstrap/dist/css/bootstrap.min.css";
import "./Add_Complaints.css"
import Navbar_Complaints from "./Navbar_Complaints";
import Template from '../../Files/Template.xlsx'
import React,{Component} from 'react'; 
import {Server_IP,Server_PORT} from '../Net_Conf'
import axios from "axios";

export default class Add_Complaints extends Component{
    state = { 
        // Initially, no file is selected 
        selectedFile: null,
        r:[]
      }; 
      // On file select (from the pop up) 
      onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
      }; 
       
      // On file upload (click the upload button) 
      onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData(); 
       
        // Update the formData object 
        formData.append( 
          "file", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        ); 
       
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        axios.post("http://"+Server_IP+":"+Server_PORT+"/uploadfile_problem", formData).then((response) => {
            console.log(response)
            alert(response.statusText)
        }); 
      }; 
       
    render(){ 
        return ( 
            <div>
                <Navbar_Complaints/>
                <div className="container-xl">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <input className="form-control form-control-lg fileupload" id="formFileLg" type="file" onChange={this.onFileChange}/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary mb-3 btnupload " onClick={this.onFileUpload}>Upload</button>
                                    <a href={Template}>DownLoad Template</a>
                                </div>
                                <div className="col">
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="col">
            
                        </div>
                    </div>
                    <div className="row">
    
                    </div>
                </div>
                <div style={{ height: '1000px'}}></div>
            </div>
            
        );
}
}


