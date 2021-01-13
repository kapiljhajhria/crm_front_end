import React from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SimpleTable from "../Table";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { makePostRequest } from "../CrmHome";

class EnquiryForm extends React.Component {
  state = {
    customerName: "",
    gender: "Male",
    mobNo: "",
    fetchedData: "",
    tableData: [],
    deletingCustList: [],
    openSnackBar: false,
    lastDeletedCustomer: {},
    showUndoIndicator: false,
  };

  errorBoolsList = [false, false];

  constructor(props) {
    super(props);
  }

  setErrorsList = (errorsList) => {
    console.log("errorList is:" + errorsList);
    this.errorBoolsList = [].concat(errorsList);
  };
  showSnackBar = () => {
    this.setState({ openSnackBar: true });
  };

  closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackBar: false });
  };
  createData = (customerID, name, gender, contact) => {
    return { _id: customerID, name, gender, contact };
  };

  deleteCustomerId = async (custId, idx) => {
    let customerDataWithIndex = {};
    customerDataWithIndex.data = this.state.tableData[idx];
    customerDataWithIndex.index = idx;
    //step 1 : add cust id to deleting list, so that indicator can be shown for deleting item
    this.setState({
      deletingCustList: this.state.deletingCustList.concat(custId),
    });
    console.log("deleting custID:" + custId);

    //step2: remove that customer from local table and also make network request to remove it from server.

    let res = await makePostRequest("http://localhost:5000/deleteCustomer", {
      customerID: custId,
    });
    let deletedCustomerID = custId;
    console.log(
      "deleting custID from network, now updating local variables:" + custId
    );
    this.setState({
      lastDeletedCustomer: customerDataWithIndex,
      tableData: this.state.tableData.filter((cust) => cust["_id"] != custId),
      deletingCustList: this.state.deletingCustList.filter(
        (id) => id !== custId
      ),
    });
    console.log(
      "main list, deleting id list and last cust deleting list updated using setState, showing snackbar now" +
        custId
    );
    this.showSnackBar();
  };
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

    if (alertWarning.length > 0) alert(alertWarning.join("\n"));
    this.setErrorsList(tempBoolsList);
    this.setState();
    return alertWarning.length === 0;
  };
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  genderList = ["Male", "Female", "Rather Not Say", "Others"];
  undoDelete = async () => {
    this.closeSnackBar();
    this.setState({ showUndoIndicator: true });
    let deleteMap = new Map();
    deleteMap["customerID"] = this.state.lastDeletedCustomer.data._id;
    let res = await makePostRequest(
      "http://localhost:5000/undoDelete",
      deleteMap
    );
    console.log("res from undo" + JSON.stringify(res));
    let tableDataCopy = [].concat(this.state.tableData);
    let deletingCustListCopy = [].concat(this.state.deletingCustList);
    deletingCustListCopy = deletingCustListCopy.filter(
      (custId) => res["deletedCustomer"]["customerID"] !== custId
    );
    this.setState({ custIdBeingDeleted: deletingCustListCopy });
    console.log(
      "trying to update table data after undo, custID and index is",
      res["deletedCustomerId"],
      this.state.lastDeletedCustomer.index
    );
    console.log(
      "going to undo delete for cust with data and at index",
      this.state.lastDeletedCustomer.data,
      this.state.lastDeletedCustomer.index
    );
    await this.updateTableData(
      tableDataCopy,
      this.state.lastDeletedCustomer.data,
      this.state.lastDeletedCustomer.index
    );
    this.setState({ showUndoIndicator: false });
  };

  updateTableData = async (tableArray, elementoBeAdded, position) => {
    console.log(
      "position in new function is: and element to be added is " + position,
      elementoBeAdded
    );
    // elementoBeAdded._id=elementoBeAdded.customerID
    if (position === undefined) tableArray.push(elementoBeAdded);
    else tableArray.splice(position, 0, elementoBeAdded);
    this.setState({ tableData: tableArray || [], lastDeletedCustomer: {} });
  };
  getCustomerIdAndSaveData = async () => {
    if (!this.validateData()) {
      this.setState({}, () => this.errorBoolsList);
      return 0;
    }
    this.setState({ fetchedData: null });
    let custDataMap = new Map();
    custDataMap["name"] = this.state.customerName;
    custDataMap["gender"] = this.state.gender;
    custDataMap["contact"] = this.state.mobNo;
    let jsonMap = await makePostRequest("http://localhost:5000/", custDataMap);
    this.setState({ fetchedData: jsonMap["_id"] });
    console.log(
      "response from server after adding another customer is ,",
      jsonMap
    );
    console.log(this.state);
    console.log("fetched CustomerID is: " + jsonMap["_id"]);

    let tableDataCopy = [].concat(this.state.tableData);
    await this.updateTableData(
      tableDataCopy,
      this.createData(
        jsonMap["_id"],
        this.state.customerName,
        this.state.gender,
        this.state.mobNo
      )
    );
    this.setState(
      {
        customerName: "",
        gender: "Male",
        mobNo: "",
        fetchedData: "",
      },
      () => this.errorBoolsList
    );
  };

  fetchFormData = async () => {
    let resp = await fetch("http://localhost:5000/customers", {
      credentials: "include",
    });
    if (resp.status === 403) {
      alert("You need to login to view this page");
      this.props.history.push("/");
      console.log("gone to home page");
    }
    let dataList = await resp.json();
    this.setState({ tableData: dataList ?? [] });
    // return JSON.parse(resp.body);
  };

  componentDidMount() {
    console.log("mounted");
    this.fetchFormData();
    console.log("data from local storage");
  }

  render() {
    return (
      <div>
        <Paper className="paper">
          <form>
            <div>
              <TextField
                name="customerName"
                id="customerName"
                label="Customer Name"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.customerName}
                error={this.errorBoolsList[0]}
              />
            </div>
            <div>
              <TextField
                name="mobNo"
                id="mobNo"
                label="Contact No."
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.mobNo}
                error={this.errorBoolsList[1]}
              />
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
                {this.genderList.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </div>
          </form>
          {this.state.fetchedData === null ? (
            <div>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.getCustomerIdAndSaveData()}
              >
                Save info
              </Button>
              {this.state.showUndoIndicator ? (
                <div>
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Paper>
        {this.state.tableData.length !== 0 ? (
          <SimpleTable
            className="simpleTable"
            tableData={this.state.tableData}
            deletingCustList={this.state.deletingCustList}
            deleteCustomerId={(custId, idx) =>
              this.deleteCustomerId(custId, idx)
            }
          />
        ) : (
          ""
        )}
        <Snackbar
          open={this.state.openSnackBar}
          autoHideDuration={3000}
          onClose={this.closeSnackBar}
        >
          <Alert
            onClose={this.closeSnackBar}
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={this.undoDelete}>
                Undo
              </Button>
            }
          >
            Customer Deleted!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default EnquiryForm;
