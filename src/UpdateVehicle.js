import React, { useEffect } from "react";
import {Field, FormikProvider, useFormik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useState } from "react";
import {useHistory} from "react-router-dom";


function UpdateVehicle(props){
            let history = useHistory();
            const[len,setLen] = useState();
            const[Scenario,setScenario] = useState([]);
            const id=props.location.state.id;
            const validationSchema = Yup.object().shape({
                Scenario_name : Yup.string().required("Scenario Name is required"),
                vehicle_name: Yup.string().required("Vehicle name is required"),
                Position_X: Yup.number().required("position x should be defined").min(0,'should be >0').max(1000,'should be <1000'),
                Position_Y: Yup.number().required("position Y should be defined").min(0,'should be >0').max(350,'should be <350'),
                Speed: Yup.number().required("Speed is required"),
                Direction: Yup.string().required("Direction should be selected")
            });
            
            useEffect(() => {
                axios.get("http://localhost:3002/Vehicle")
                .then(response => {
                    const vehicle=response.data;
                    setLen(vehicle.length);
                console.log(len); });
                axios.get("http://localhost:3001/Scenario")
                .then(res => {
                    setScenario(res.data);
                    console.log(res.data);
                })
            })
            const formik = useFormik({
                initialValues : {
                    Scenario_name : props.location.state.Scenario_name,
                    vehicle_name: props.location.state.vehicle_name,
                    Position_X: props.location.state.Position_X,
                    Position_Y: props.location.state.Position_Y,
                    Speed: props.location.state.Speed,
                    Direction: props.location.state.Direction
                },

                validationSchema,
                onSubmit: values => {
                    var Vehicle={};
                    Vehicle.Scenario_name = values.Scenario_name;
                    Vehicle.vehicle_name = values.vehicle_name;
                    Vehicle.Position_X = values.Position_X;
                    Vehicle.Position_Y = values.Position_Y;
                    Vehicle.Speed = values.Speed;
                    Vehicle.Direction = values.Direction;
                    axios.put("http://localhost:3002/Vehicle"+id,Vehicle)
                    .then(response => console.log(response.data));
                    props.history.push("/");
                }
            })
    
        return(
            <>
            <Sidebar />
             <div className="addscenario">
                <h4>Vehicle/add</h4>
                <h2>Add Vehicle</h2>
                <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit} style={{width:950,height:270}}>
                 <div className="form">   
                <p style={{float:"left",marginLeft:20}}>
                    <label htmlFor="Scenario_name">Scenarios List</label><br/>
                    <select name="Scenario_name"
                           id="Scenario_name"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.Scenario_name}>
                            <option selected value="">Select Scenario{" "}</option>
                            {
                                Scenario.map(s => (
                                    <option value={s.Scenario_name}>{s.Scenario_name}</option>
                                ))
                            }
                           </select><br/>
                    {formik.errors.Direction && formik.touched.Direction ? <span>{formik.errors.Direction}</span> : null}
                    </p>
                    <p style={{float:"left",marginLeft:35}}>
                    <label htmlFor="vehicle_name">Vehicle Name</label><br/>
                    <Field type="text"
                           name="vehicle_name"
                           id="vehicle_name"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.vehicle_name}
                           ></Field><br/>
                    {formik.errors.vehicle_name && formik.touched.vehicle_name ? <span>{formik.errors.vehicle_name}</span> : null}
                    </p>
                    <p style={{float:"right",marginRight:20}}>
                    <label htmlFor="Speed">Speed</label><br/>
                    <Field type="text"
                           name="Speed"
                           id="Speed"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.Speed}
                           ></Field><br/>
                    {formik.errors.Speed && formik.touched.Speed ? <span>{formik.errors.Speed}</span> : null}
                    </p><br/>
                    <p style={{float:"left",marginLeft:20,marginTop:25}}>
                    <label htmlFor="Position_X">Position X</label><br/>
                    <Field type="text"
                           name="Position_X"
                           id="Position_X"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.Position_X}
                           ></Field><br/>
                    {formik.errors.Position_X && formik.touched.Position_X ? <span>{formik.errors.Position_X}</span> : null}
                    </p>
                    <p style={{float:"left",marginLeft:35,marginTop:25}}>
                    <label htmlFor="Position_Y">Position Y</label><br/>
                    <Field type="text"
                           name="Position_Y"
                           id="Position_Y"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.Position_Y}
                           ></Field><br/>
                    {formik.errors.Position_Y && formik.touched.Position_Y ? <span>{formik.errors.Position_Y}</span> : null}
                    </p>
                    <p style={{float:"right",marginRight:20,marginTop:25}}>
                    <label htmlFor="Direction">Direction</label><br/>
                    <select name="Direction"
                           id="Direction"
                           onChange={formik.handleChange}
                           defaultValue={formik.values.Direction}>
                            <option selected value="">Select Direction{" "}</option>
                            <option value="Towards">Towards</option>
                            <option value="Upwards">Upwards</option>
                            <option value="Downwards">Downwards</option>
                            <option value="Backwards">Backwards</option>
                           </select><br/>
                    {formik.errors.Direction && formik.touched.Direction ? <span>{formik.errors.Direction}</span> : null}
                    </p>
                </div>
                <p className="butv">
                <button type="submit" style={{marginLeft:65,backgroundColor:"rgb(22, 205, 56)"}}>Add</button>
                <button type="reset" style={{backgroundColor:"rgb(246, 84, 25)"}} onClick={e => formik.resetForm()}>Reset</button>
                <button style={{backgroundColor:"rgb(34, 120, 240)"}} onClick={() => history.goBack()}>Go Back</button>
                </p>
                </Form>
                </FormikProvider>
             </div>
            </>
        )
    }


export default UpdateVehicle;