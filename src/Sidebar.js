import {Link} from "react-router-dom";

function Sidebar(){
    return(
        <>
        <div className='fLeft'>
        <Link to="/"><button style={{marginTop:70}}>Home</button></Link><br/>
        <Link to="/AddScenario"><button>Add Scenario</button></Link><br/>
        <Link to="/AllScenarios"><button>All Scenarios</button></Link><br/>
        <Link to="/AddVehicle"><button>Add Vehicle</button></Link>
        </div>
        </>
    )
}

export default Sidebar;