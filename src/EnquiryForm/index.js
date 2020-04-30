import React from "react";
import './styles.css'
import {Button} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SimpleTable from "../Table";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from '@material-ui/lab';

class EnquiryForm extends React.Component {
    state = {
        customerName: '',
        gender: "Male",
        mobNo: "",
        fetchedData: "",
        tableData: [],
        custIdBeingDeleted: [],
        openSnackBar: false,
        lastDeletedCustomer: [],
        showUndoIndicator: false
    };

    errorBoolsList = [false, false];

    constructor(props) {
        super(props);

    }

    setErrorsList = (errorsList) => {
        console.log("errorList is:" + errorsList)
        this.errorBoolsList = [].concat(errorsList);
    }
    showSnackBar = () => {
        this.setState({openSnackBar: true});
    };

    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSnackBar: false});
    };
    createData = (customerID, name, gender, contact,) => {
        return {customerID, name, gender, contact,}
    }

    deleteCustomerId = async (custId) => {
        let custIdBeingDeletedCopy = [].concat(this.state.custIdBeingDeleted);
        custIdBeingDeletedCopy.push(custId);
        this.setState({custIdBeingDeleted: custIdBeingDeletedCopy})
        console.log("deleting stuff id:" + custId);
        let res = await this.makePostRequest("http://localhost:5000/deleteCustomer", {customerID: custId})
        console.log("res from delete" + JSON.stringify(res))
        let tableDataCopy = [].concat(this.state.tableData)
        let indexOfCust = tableDataCopy.findIndex((cust) => cust.custId === custId);
        console.log("found index:" + indexOfCust)
        let lastDeletedCustomerCopy = tableDataCopy.splice(indexOfCust, 1);
        lastDeletedCustomerCopy = [lastDeletedCustomerCopy[0], indexOfCust]
        this.setState({lastDeletedCustomer: lastDeletedCustomerCopy})
        localStorage.setItem('myData', JSON.stringify(tableDataCopy));
        let dataList = JSON.parse(localStorage.getItem('myData'));
        this.setState({tableData: dataList ?? []})
        this.showSnackBar();
        // let custIdBeingDeletedCopy = [].concat(this.state.custIdBeingDeleted);
        custIdBeingDeletedCopy = custIdBeingDeletedCopy.filter((custId) => lastDeletedCustomerCopy[0].custId !== custId)
        this.setState({custIdBeingDeleted: custIdBeingDeletedCopy});

    }
    validateData = () => {
        let tempBoolsList = [false, false];
        let alertWarning = [];
        if (this.state.customerName.length === 0) {
            alertWarning.push("Customer Name can't be empty");
            tempBoolsList[0] = true;
        }
        if (this.state.mobNo.length === 0) {
            alertWarning.push("Contact number can't be empty");
            tempBoolsList[1] = true;
        }
        if (isNaN(this.state.mobNo)) {
            alertWarning.push("Please enter valid mob number");
            tempBoolsList[1] = true;
        }
        if (`${parseInt(this.state.mobNo)}`.length !== 10) {
            alertWarning.push("Contact Number needs to be of 10 digit");
            tempBoolsList[1] = true;
        }

        if (alertWarning.length > 0)
            alert(alertWarning.join("\n"));
        this.setErrorsList(tempBoolsList);
        this.setState();
        return alertWarning.length === 0
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    genderList = ["Male", "Female", "Rather Not Say", "Others"];
    undoDelete = async () => {
        this.closeSnackBar();
        this.setState({showUndoIndicator: true})
        let deleteMap = new Map();
        deleteMap["customerID"] = this.state.lastDeletedCustomer[0]["custId"];
        let res = await this.makePostRequest("https://us-central1-form-manager-7234f.cloudfunctions.net/undoDeleteCustomer", deleteMap)
        console.log("res from undo" + JSON.stringify(res))
        let lastDeletedCustomerCopy = this.state.lastDeletedCustomer;
        let tableDataCopy = [].concat(this.state.tableData);
        let custIdBeingDeletedCopy = [].concat(this.state.custIdBeingDeleted);
        custIdBeingDeletedCopy = custIdBeingDeletedCopy.filter((custId) => lastDeletedCustomerCopy[0].custId !== custId)
        this.setState({custIdBeingDeleted: custIdBeingDeletedCopy});
        await this.updateTableData(tableDataCopy, lastDeletedCustomerCopy[0], lastDeletedCustomerCopy[1])
        this.setState({showUndoIndicator: false})
    }

    updateTableData = async (tableArray, elementoBeAdded, position) => {
        console.log("position in new function is:" + position)
        if (position === undefined)
            tableArray.push(elementoBeAdded)
        else
            tableArray.splice(position, 0, elementoBeAdded);
        this.setState({tableData: tableArray, lastDeletedCustomer: []});
        localStorage.setItem('myData', JSON.stringify(tableArray));
    }
    getCustomerId = async () => {
        if (!this.validateData()) {
            this.setState({}, () => this.errorBoolsList);
            return 0;
        }
        this.setState({fetchedData: null});
        let custDataMap = new Map();
        custDataMap["name"] = this.state.customerName;
        custDataMap["gender"] = this.state.gender;
        custDataMap["contact"] = this.state.mobNo;
        let jsonMap = await this.makePostRequest('http://localhost:5000/', custDataMap);
        this.setState({fetchedData: jsonMap['customerID']});
        console.log(this.state);
        console.log("fetched CustomerID is: " + jsonMap['customerID']);

        let tableDataCopy = [].concat(this.state.tableData);
        await this.updateTableData(tableDataCopy, this.createData(jsonMap['customerID'], this.state.customerName, this.state.gender, this.state.mobNo))
        this.setState({
            customerName: '',
            gender: "Male",
            mobNo: "",
            fetchedData: "",
        }, () => this.errorBoolsList)
    }

    makePostRequest = async (url, dataAsMap) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataAsMap)
        })
        let jsonMap = await response.json();
        return jsonMap;
    }
    fetchFormData = async () => {
        let resp = await fetch("http://localhost:5000/customers");
        let dataList = await resp.json();
        this.setState({tableData: dataList ?? []})
        // return JSON.parse(resp.body);
    }

    componentDidMount() {
        console.log("mounted")
        this.fetchFormData();
        console.log("data from local storage");
    }

    render() {

        return (
            <div>
                <Paper className="paper">
                    <form>
                        <div>
                            <TextField name="customerName" id="customerName" label="Customer Name" variant="outlined"
                                       onChange={this.handleInputChange} value={this.state.customerName}
                                       error={this.errorBoolsList[0]}
                            />
                            {/*<label htmlFor="customerName">Your Name:</label>*/}
                            {/*<input type="text" name="customerName" value={this.state.customerName}*/}
                            {/*       onChange={this.handleInputChange}/>*/}
                        </div>
                        <div>
                            <TextField name="mobNo" id="mobNo" label="Contact No." variant="outlined"
                                       onChange={this.handleInputChange} value={this.state.mobNo}
                                       error={this.errorBoolsList[1]}/>

                        </div>
                        <div>


                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                name={"gender"}
                                value={this.state.gender}
                                onChange={this.handleInputChange}
                                color="secondary"
                            >
                                {this.genderList.map((el) =>
                                    (<MenuItem value={el}>{el}</MenuItem>)
                                )}
                            </Select>

                        </div>

                    </form>
                    {this.state.fetchedData === null ? <div>
                            <CircularProgress color="secondary"/></div> :
                        <div>
                            <Button color="primary" variant="contained" onClick={() => this.getCustomerId()}>Save info
                            </Button>
                            {this.state.showUndoIndicator ? <div>
                                <CircularProgress color="secondary"/></div> : ""}
                        </div>}
                </Paper>
                {this.state.tableData.length !== 0 ?
                    <SimpleTable className="simpleTable" tableData={this.state.tableData}
                                 custIdBeingDeleted={this.state.custIdBeingDeleted}
                                 deleteCustomerId={(custId) => this.deleteCustomerId(custId)}/> : ""}
                <Snackbar open={this.state.openSnackBar} autoHideDuration={3000} onClose={this.closeSnackBar}>
                    <Alert onClose={this.closeSnackBar} severity="success" action={
                        <Button color="inherit" size="small" onClick={this.undoDelete}>
                            Undo
                        </Button>
                    }>
                        Customer Deleted!
                    </Alert>
                </Snackbar>
                {/*<Alert onClose={this.closeSnackBar} severity="success" action={*/}
                {/*    <Button color="inherit" size="small" onClick={this.undoDelete}>*/}
                {/*        Undo*/}
                {/*    </Button>*/}
                {/*}>*/}
                {/*    Customer Deleted!*/}
                {/*</Alert>*/}
                {/*<Alert severity="error">This is an error message!</Alert>*/}
                {/*<Alert severity="warning">This is a warning message!</Alert>*/}
                {/*<Alert severity="info">This is an information message!</Alert>*/}
                {/*<Alert severity="success" action={*/}
                {/*    <Button color="inherit" size="small">*/}
                {/*        Undo*/}
                {/*    </Button>*/}
                {/*}>This is a success message!</Alert>*/}

            </div>
        );
    }
}


export default EnquiryForm;