import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Component } from 'react';
import { RequireToken } from "./Components/Auth";
import Add from './Components/Add'
class App extends Component {
  render(){
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element = {<Login/>}/>
        <Route path="/home" element = {<RequireToken><Home/></RequireToken>}/>
        <Route path="/home/add" element = {<RequireToken><Add/></RequireToken>}/>
      </Routes>
    </div>
  );
}}

export default App;
