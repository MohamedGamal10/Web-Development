import "bootstrap/dist/css/bootstrap.min.css";
import './Card.css'
import React, { Component } from "react";
export default class Card extends Component {
  render() {
    return (
      <div style={{'margin-bottom':'5px'}}>
        <div className={"card border-info mb-7 wid " + this.props.className}>
          <div className="card-header"><h2>{this.props.header}</h2></div>
          <div className="card-body">
            <h3 className="card-title">{this.props.title_total} : {this.props.text_total}</h3>
            <h3 className="card-title">{this.props.title_Huawei} : {this.props.text_Huawei}</h3>
            <h3 className="card-title">{this.props.title_Nokia} : {this.props.text_Nokia}</h3>
          </div>
        </div>
      </div>
      
    );
  }
}
