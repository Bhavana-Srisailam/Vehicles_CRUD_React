import React from "react";
import AddScenario from './AddScenario';
import AllScenarios from './AllScenarios';
import UpdateScenario from "./UpdateScenario";
import AddVehicle from "./AddVehicle";
import UpdateVehicle from "./UpdateVehicle";
import Home from "./Home";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";

class App extends React.Component{
  render(){
  return (
    <>
    <Router>
  
   <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/AddScenario" component={AddScenario}></Route>
    <Route path="/AllScenarios" component={AllScenarios}></Route>
    <Route path="/UpdateScenario" component={UpdateScenario}></Route>
    <Route path="/AddVehicle" component={AddVehicle}></Route>
    <Route path="/UpdateVehicle" component={UpdateVehicle}></Route>
   </Switch>

</Router></>
  );
}
}

export default App;
