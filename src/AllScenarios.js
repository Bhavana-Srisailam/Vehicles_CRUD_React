import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom";

class AllScenarios extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Scenario : [],
            Vehicle:[],
            n:0
            
        };

        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    

    componentDidMount(){
        axios.get("http://localhost:3001/Scenario")
        .then(response => {
            const Scenario = response.data;
            console.log(Scenario);
            this.setState({Scenario : Scenario});
            console.log(this.state.Scenario.length);
        })
        axios.get("http://localhost:3002/Vehicle")
        .then(res => {
            const Vehicle = res.data;
            this.setState({Vehicle : Vehicle});
        })
        
    }

   /* vehiclecount(){
        for(var i=0;i<this.state.Scenario.length;i++)
        {
            n=0;
            for(var j=0;j<this.state.Vehicle.length;j++)
            {
                if(Scenario[i].Scenario_name===Vehicle[j].Scenario_name)
                {
                    n++;
                }
            }
            return n;
            
        }
    }*/
    
    
    

    delete(id){
        axios.delete("http://localhost:3001/Scenario/"+id)
        .then();
    }

    deleteAll = () => {
        
            for(var i=0;i<this.state.Scenario.length;i++)
            {
                var id=this.state.Scenario[i].id;
                axios.delete("http://localhost:3001/Scenario/"+id)
                .then();
            }
            
        
    }
    
    render(){
        return(
            <>
            <Sidebar/>
            <div className="AllScenarios">
                
                <p><span style={{fontSize:30}}>All Scenarios</span>
                <button style={{backgroundColor:"rgb(246, 84, 25)",marginRight:50}} onClick={this.deleteAll}>Delete All</button>
                <Link to="/AddVehicle"><button style={{backgroundColor:"rgb(22, 205, 56)"}}>Add Vehicle</button></Link>
                <Link to="/AddScenario"><button style={{backgroundColor:"rgb(34, 120, 240)"}}>New Scenario</button></Link><br/>
                </p>
                 <table>
                            <tr>
                                <th style={{paddingLeft:55}}>Scenario Id</th>
                                <th>Scenario Name</th>
                                <th>Scenario Time</th>
                                <th>Number of Vehicles</th>
                                <th>Add Vehicle</th>
                                <th>Edit</th>
                                <th style={{paddingRight:55}}>Delete</th>
                            </tr>
                            
                            {
                                this.state.Scenario.map(s => (
                                
                                <tr>
                                <td style={{paddingLeft:55}}>{s.id}</td>
                                <td>{s.Scenario_name}</td>
                                <td>{s.Time}</td>
                                <td>0</td>
                                <td><Link to={{pathname:"/AddVehicle"}} style={{color:"black"}}><i className="fa fa-plus-circle"></i></Link></td>
                                <td><Link to={{pathname:"/UpdateScenario",
                                state: {id : s.id,Scenario_name: s.Scenario_name,Time: s.Time}}} style={{color:"black"}}><i className="fa fa-pencil"></i></Link></td>
                                <td style={{paddingRight:55}}><i className="fa fa-trash" onClick={() => this.delete(s.id)}></i></td>
                                </tr>
                                
                                ))
                }
                </table>
            </div>
            </>
        )
    }
}

export default AllScenarios;