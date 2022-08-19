# Vehicles_CRUD_React
I have used Visual Studio Code as tool for this project. 

Steps to create or install project:
a. Firstly create bundle structure using command create-react-app projectname.
b. As I am comfortable with react 16.3.0 version of react elements, i have cleared the node_modules,package_Lock.json files and reinstalled them using npm install command after changing the react version to 16.3.0 in package.json file.
Note:
  1. If you wish to continue with the latest version of react you can go ahead by making changes based on updated features in the code.
  2. Or you can do the above process(Step b) and make sure to cross check the versions of react third party libraries with the package.json i have uploaded.
c. Install all the third party libraries (json-server, react-router-dom, axios, bootstrap, font-awesome, formik, yup) using npm install command.
d. In the terminal, move to the path where json files are present and run scenario.json file in port 3001 using json-server -w scenario.json -p 3001 command.
e. In the same way run vehicle.json file in port 3002 in new terminal.
f. And then move to the actual react project path and start the project using npm start command which will automatically redirect to the default browser after few minutes.

Things done in the project:
a. I have created a sidebar for the menu items Home, Add Scenario, All Scenarios,  Add Vehicle.
b. Home Component: 
    1. I have kept a dropdown to select a Scenario based on which user gets the details of Vehicles present in that scenario.
    2. User can be able to edit and delete the vehicle details.
    3. I have also kept a graph which contains vehicles placed in their positions based on x and y values declared in json file.
    4. I have also created two buttons like start simulation and stop simulation. on clicking, the vehicles should move based on details present in server, unfortunately I            couldn't achieve that.
c. Add Scenario:
   It allows us to create a scenario by giving scenario name and time. It also has validations done using Yup to display error messages.
d. All Scenarios:
    In this component, we will be able to get the data of all scenarios, edit and delete the scenarios. we also have the option of deleting all scenarios at a time.
e. Add Vehicle:
    It allows us to add a vehicle to Scenario by giving scenario name and all the vehicle related details. It also has validations done using Yup to display error messages.
 
