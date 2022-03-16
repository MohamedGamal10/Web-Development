import "bootstrap/dist/css/bootstrap.min.css";
import "./Table.css"
import React , { useState } from "react";
import axios from "axios";

export default function Table() {
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
                'http://localhost:8000/select',
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
        axios.delete('http://localhost:8000/delete/'+id)
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
						<h2>Manage <b>Customers Problems</b></h2>
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
						<th className="visually-hidden">ID</th>
						<th>MSISDN</th>
						<th>IMSI</th>
                        <th>Serial Number</th>
						<th>Problem Case</th>
						<th>Problem Input</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Solving Comment</th>
                        <th>Other Comments</th>
					</tr>
				</thead>
				<tbody>
                {Data.map(item => 
					<tr key={item.ID}>
						<td className="visually-hidden">{item.ID}</td>
                        <td>{item.MSISDN}</td>
                        <td>{item.IMSI}</td>
                        <td>{item.serial_number}</td>
                        <td>{item.Problem_Case}</td>
                        <td>{item.Problem_input}</td>
                        <td>{item.Date}</td>
                        <td>{item.Action}</td>
                        <td>{item.Solving_Comment}</td>
                        <td>{item.Other_Comments}</td>
						
						<td>
							<a href="#" className="delete" data-toggle="modal" onClick={(e)=> Delete(item.ID,e)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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



