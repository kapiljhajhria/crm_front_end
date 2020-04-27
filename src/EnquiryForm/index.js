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

    constructor(props) {
        super(props);
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
    createData = (custId, name, gender, contact,) => {
        return {custId, name, gender, contact,}
    }

    deleteCustomerId = async (custId) => {
        let custIdBeingDeletedCopy = JSON.parse(JSON.stringify(this.state.custIdBeingDeleted));
        custIdBeingDeletedCopy.push(custId);
        this.setState({custIdBeingDeleted: custIdBeingDeletedCopy})
        console.log("deleting stuff id:" + custId);
        await fetch("https://cors-anywhere.herokuapp.com/http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk ");

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
        await fetch("https://cors-anywhere.herokuapp.com/http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk ");
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
        this.setState({fetchedData: null});
        let postData = new FormData();
        const payload = this.state;
        postData.append("myjsonkey", JSON.stringify(payload));

        let response = await fetch('https://cors-anywhere.herokuapp.com/https://us-central1-form-manager-7234f.cloudfunctions.net/saveCustomer', {
            method: 'POST',
            headers: postData
        })
        let jsonMap = await response.json();
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
        })
    }

    componentDidMount() {
        let dataList = JSON.parse(localStorage.getItem('myData'));
        this.setState({tableData: dataList ?? []})
        console.log(localStorage.getItem('myData'))
        // localStorage.getItem('myData').then((data)=>{
        //     console.log(data);
        //     console.log(" 2data from local storage");
        // })
        console.log("data from local storage");
    }

    render() {
        return (
            <div>
                <Paper className="paper">
                    <form>
                        <div>
                            <TextField name="customerName" id="customerName" label="Customer Name" variant="outlined"
                                       onChange={this.handleInputChange} value={this.state.customerName}/>
                            {/*<label htmlFor="customerName">Your Name:</label>*/}
                            {/*<input type="text" name="customerName" value={this.state.customerName}*/}
                            {/*       onChange={this.handleInputChange}/>*/}
                        </div>
                        <div>
                            <TextField name="mobNo" id="mobNo" label="Contact No." variant="outlined"
                                       onChange={this.handleInputChange} value={this.state.mobNo}/>

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
                <SimpleTable className="simpleTable" tableData={this.state.tableData}
                             custIdBeingDeleted={this.state.custIdBeingDeleted}
                             deleteCustomerId={(custId) => this.deleteCustomerId(custId)}/>
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