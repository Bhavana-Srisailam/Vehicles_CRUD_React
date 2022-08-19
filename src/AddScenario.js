import React, { useEffect } from "react";
import {Field, FormikProvider, useFormik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useState } from "react";
import {useHistory} from "react-router-dom";


function AddScenario(props){
            let history = useHistory();
            const[len,setLen] = useState();
            const validationSchema = Yup.object().shape({
                Scenario_name : Yup.string().required("Scenario Name is required"),
                Time: Yup.string().required("Time is required")
            });
            
            useEffect(() => {
                axios.get("http://localhost:3001/Scenario")
                .then(response => {
                    setLen(response.data.length);
                console.log(len); });
            })
            const formik = useFormik({
                initialValues : {
                    id : '',
                    Scenario_name : '',
                    Time : ''
                },

                validationSchema,
                onSubmit: values => {
                    var Scenario={};
                    Scenario.id = len + 1;
                    Scenario.Scenario_name = values.Scenario_name;
                    Scenario.Time = values.Time + 's';
                    axios.post("http://localhost:3001/Scenario",Scenario);
                    props.history.push("/AllScenarios");
                }
            })
    
        return(
            <>
            <Sidebar />
             <div className="addscenario">
                <h4>Scenario/add</h4>
                <h2>Add Scenario</h2>
                <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="form">
                    <p style={{float:"left",marginLeft:60}}>
                    <label htmlFor="Scenario_name">Scenario Name</label><br/>
                    <Field type="text"
                           name="Scenario_name"
                           id="Scenario_name"
                           onChange={formik.handleChange}
                           value={formik.values.Scenario_name}
                           ></Field><br/>
                    {formik.errors.Scenario_name && formik.touched.Scenario_name ? <span>{formik.errors.Scenario_name}</span> : null}
                    </p>
                    <p style={{float:"right",marginRight:60}}>
                    <label htmlFor="Time">Scenario Time (Seconds)</label><br/>
                    <Field type="text"
                           name="Time"
                           id="Time"
                           onChange={formik.handleChange}
                           value={formik.values.Time}
                           ></Field><br/>
                    {formik.errors.Time && formik.touched.Time ? <span>{formik.errors.Time}</span> : null}
                    </p>
                </div>
                <p className="but">
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


export default AddScenario;