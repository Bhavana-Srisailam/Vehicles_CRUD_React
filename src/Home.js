import Sidebar from "./Sidebar";
import axios from "axios";
import {Link} from "react-router-dom";
import React from "react";
import {animated} from "react-spring";


class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            Scenario: [],
            Vehicle: [],
            SName: '',
        }

        this.delete = this.delete.bind(this);
    }
    componentDidMount(){
        axios.get("http://localhost:3002/Vehicle")
                .then(response => {
                    const Vehicle = response.data;
                    this.setState({Vehicle : Vehicle}) })
        axios.get("http://localhost:3001/Scenario")
                .then(res => {
                    const Scenario = res.data;
                    this.setState({Scenario : Scenario}) })
    }

    delete(id)
    {
        axios.delete("http://localhost:3002/Vehicle/"+id)
        .then();
    }

    render(){
    return(
        <>
        <Sidebar />
        <div className="Home">
        
        <label htmlFor="SName">Scenario</label><br/>
        <select id="SName" value={this.state.SName} 
              onChange={(e) => this.setState({SName: e.target.value})}>
        <option selected value="">Select Scenario{" "}</option>
            {
                this.state.Scenario.map(s => (
                    <option value={s.Scenario_name}>{s.Scenario_name}</option>
                 ))
            }
        </select>
        <table style={{width:1005}}>
            <tr>
                <th style={{paddingLeft:55}}>Vehicle Id</th>
                <th>Vehicle Name</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Speed</th>
                <th>Direction</th>
                <th>Edit</th>
                <th style={{paddingRight:55}}>Delete</th>
                </tr>
                {
                    this.state.Vehicle.map(v => (
                        <>
                        {
                         (v.Scenario_name === this.state.SName) ? 
                         <tr>
                            <td>{v.id}</td>
                            <td>{v.vehicle_name}</td>
                            <td>{v.Position_X}</td>
                            <td>{v.Position_Y}</td>
                            <td>{v.Speed}</td>
                            <td>{v.Direction}</td>
                            <td><Link to={{pathname:"/UpdateVehicle",
                            state: {id : v.id,Scenario_name: v.Scenario_name,Speed: v.Speed,Direction: v.Direction, Position_X: v.Position_X, Position_Y:v.Position_Y,vehicle_name: v.vehicle_name}}} 
                            style={{color:"black"}}><i className="fa fa-pencil"></i></Link></td>
                            <td style={{paddingRight:55}}><i className="fa fa-trash" onClick={() => this.delete(v.id)}></i></td>
                         </tr> 
                         : ""
                        }
                        </>
                    ))

                }
                </table> 
                <button className="start" style={{backgroundColor:"rgb(34, 120, 240)",marginRight:70}}>Stop Simulation</button>
                <button className="stop" style={{backgroundColor:"rgb(22, 205, 56)"}}>Start Simulation</button><br/>
                
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvyOFQKQOqjuwKryV2fL39zxa2T6I8Ve0gT7UIHEbJE_SQ0FRxh8Qt7uCT222DL2IPfc&usqp=CAU" style={{width:1005,height:350}}></img>
    
                {
                    this.state.Vehicle.map(v => (
                        <>
                        {
                         (v.Scenario_name === this.state.SName) ? 
                        <animated.div 
                        style={{marginLeft:v.Position_X,marginTop:(350-v.Position_Y),animationDirection:v.Direction,animationDelay:v.Speed}}
                        className="circle">{v.id}</animated.div> : ""
                        }
                        </>
                        ))
                 }
                 
                 
        </div>
        </>
    )
}
}

export default Home;