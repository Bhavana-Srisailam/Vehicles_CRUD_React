import React from "react";
import {Field, FormikProvider, useFormik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom";

function UpdateScenario(props){
            const id= props.location.state.id;
            const validationSchema = Yup.object().shape({
                scenarioName : Yup.string().required("Scenario Name is required"),
                Time: Yup.string().required("Time is required")
            });

            const formik = useFormik({
                initialValues : {
                    Scenario_name : props.location.state.Scenario_name,
                    Time : props.location.state.Time
                },

                validationSchema,
                onsubmit:values => {
                    var Scenario={};
                    Scenario.Scenario_name = values.Scenario_name;
                    Scenario.Time = values.Time + 's';
                    axios.put("http://localhost:3001/Scenario"+id,Scenario)
                    .then(response => console.log(response.data));
                    props.history.push("/AllScenarios");

                }
            })

    
        return(
            <>
            <Sidebar />
            <div className="addscenario">
                <h4>Scenario/update</h4>
                <h2>Update Scenario</h2>
                <FormikProvider value={formik}>
                <Form onsubmit={formik.handleSubmit}>
                    
                    <p style={{float:"left",marginLeft:60}}>
                    <label htmlFor="Scenario_name">Scenario Name</label><br/>
                    <Field type="text"
                           name="Scenario_name"
                           id="Scenario_name"
                           onChange={formik.handleChange}
                           defaultValue={props.location.state.Scenario_name}
                           ></Field>
                    {formik.errors.Scenario_name && formik.touched.Scenario_name ? <div style={{color:"red",fontSize:15}}>{formik.errors.Scenario_name}</div> : null}
                    </p>
                    <p style={{float:"right",marginRight:60}}>
                    <label htmlFor="Time">Scenario Time (Seconds)</label><br/>
                    <Field type="text"
                           name="Time"
                           id="Time"
                           onChange={formik.handleChange}
                           defaultValue={props.location.state.Time}
                           ></Field>
                    {formik.errors.Time && formik.touched.Time ? <div style={{color:"red",fontSize:15}}>{formik.errors.Time}</div> : null}
                    </p>
                
                </Form>
                <button type="submit" style={{marginLeft:65,backgroundColor:"rgb(22, 205, 56)"}}>Add</button>
                <button type="reset" style={{backgroundColor:"rgb(246, 84, 25)"}} onClick={e => formik.resetForm()}>Reset</button>
                <Link to="/AllScenarios"><button style={{backgroundColor:"rgb(34, 120, 240)"}}>Go Back</button></Link>
                
                </FormikProvider>
             </div>
            </>
        )
    }


export default UpdateScenario;