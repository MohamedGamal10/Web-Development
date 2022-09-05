import "bootstrap/dist/css/bootstrap.min.css";
import "./Table_Complaints.css"
import React , { useState } from "react";
import axios from "axios";
import {Server_IP,Server_PORT} from '../Net_Conf'

export default function Table_Complaints() {
    const [msisdn, setmsisdn] = useState("");
    const [imsi, setimsi] = useState("");
    const [serial_number, setserial_number] = useState("");
    const [problem_case, setproblem_case] = useState("");
    const [problem_input, setproblem_input] = useState("");
    const [datefrom, setdatefrom] = useState("");
    const [dateto, setdateto] = useState("");
    const [action, setaction] = useState("");
    const [solving_comment, setsolving_comment] = useState("");
    const [other_comments, setother_comments] = useState("");
    const [Data,setData] = useState([]);
    const Search = (e) => {
        e.preventDefault();
        const data = {
          msisdn: msisdn,
            imsi: imsi,
            serial_number: serial_number,
            problem_case:problem_case,problem_input: problem_input,
            datefrom: datefrom,dateto: dateto,action: action,
            solving_comment: solving_comment,other_comments: other_comments
        };
        const headers = { 'header-name': 'value' };
        const config = { headers, };
        axios
            .post(
                "http://"+Server_IP+":"+Server_PORT+"/select_problem",
                data,
                config,
            )
            .then((response) => {
                setData(response.data)
            })
            .catch((e) => console.log('something went wrong :(', e));
    };

    const Delete = (id,e) => {
        e.preventDefault();
        axios.delete("http://"+Server_IP+":"+Server_PORT+"/delete_problem/"+id)
        .then(res=>{
            alert(res.data)
        }).catch(res=>alert(res.data))
    }

  return (
      
    <div>
        <div className="container-xl">
	    <div className="table-responsive">
		<div className="table-wrapper">
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Rare <b>Customers Complaints</b></h2>
					</div>
				</div> 
			</div>
            <form className="row gy-2 gx-3 align-items-center">
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">MSISDN</label>
                    <input type="text" className="form-control" placeholder="MSISDN" onChange={(e) => setmsisdn(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">IMSI</label>
                    <input type="text" className="form-control" placeholder="IMSI"onChange={(e) => setimsi(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Serial Number</label>
                    <input type="text" className="form-control" placeholder="Serial Number"onChange={(e) => setserial_number(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Problem Case</label>
                    <input type="text" className="form-control" placeholder="Problem Case"onChange={(e) => setproblem_case(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Problem Input</label>
                    <input type="text" className="form-control" placeholder="Problem Input"onChange={(e) => setproblem_input(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Date From</label>
                    <input type="date" className="form-control" placeholder="Date From"onChange={(e) => setdatefrom(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Date To</label>
                    <input type="date" className="form-control" placeholder="Date To"onChange={(e) => setdateto(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Action</label>
                    <input type="text" className="form-control" placeholder="Action" onChange={(e) => setaction(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Solving Comment</label>
                    <input type="text" className="form-control" placeholder="Solving Comment" onChange={(e) => setsolving_comment(e.target.value)}/>
                </div>
                <div className="col-auto">
                    <label className="" htmlFor="autoSizingInput">Other Comments</label>
                    <input type="text" className="form-control" placeholder="Other Comments" onChange={(e) => setother_comments(e.target.value)}/>
                </div>
                
                <div className="sub">
                    <button type="submit" className="btn btn-primary subcolor" onClick={Search}>Search</button>
                </div>
            </form>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						
						<th>MSISDN</th>
						<th style={{"width": "16%"}}>IMSI</th>
                        <th>Serial Number</th>
						<th>Problem Case</th>
						<th style={{"width": "17%"}}>Problem Input</th>
                        <th>Date</th>
                        <th style={{"width": "13%"}}>Action</th>
                        <th style={{"width": "13%"}}>Solving Comment</th>
                        <th>Other Comments</th>
					</tr>
				</thead>
				<tbody>
                {Data.map(item => 
					<tr key={item.Id}>
                        <td>{item.MSISDN}</td>
                        <td>{item.IMSI}</td>
                        <td>{item.Serial_Number}</td>
                        <td>{item.Problem_Case}</td>
                        <td>{item.Problem_input}</td>
                        <td>{item.Date}</td>
                        <td>{item.Action}</td>
                        <td>{item.Solving_Comment}</td>
                        <td>{item.Other_Comments}</td>
						
						<td>
							<a href="#" className="delete" data-toggle="modal" onClick={(e)=> Delete(item.Id,e)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
						</td>
					</tr>
                    )}
				</tbody>
			</table>
        </div>
    </div>
    </div>
    </div>
    
  );
}



