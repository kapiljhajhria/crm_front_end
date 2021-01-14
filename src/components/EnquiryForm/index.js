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
import * as customerService from "../../services/customerService";
const _ = require("lodash");
class EnquiryForm extends React.Component {
  state = {
    name: "",
    gender: "male",
    contact: "",
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

    const resp = await customerService.deleteCustomer(custId);
    console.log("customer deleted, resp.data is ", resp.data);
    this.setState({
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
    if (this.state.name.length === 0) {
      alertWarning.push("Customer Name can't be empty");
      tempBoolsList[0] = true;
    }
    if (this.state.contact.length === 0) {
      alertWarning.push("Contact number can't be empty");
      tempBoolsList[1] = true;
    }
    if (isNaN(this.state.contact)) {
      alertWarning.push("Please enter valid mob number");
      tempBoolsList[1] = true;
    }
    if (`${parseInt(this.state.contact)}`.length !== 10) {
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
  genderList = ["male", "female", "others", "prefer not to say"];

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
    //validate data and show alert window
    if (!this.validateData()) {
      this.setState({}, () => this.errorBoolsList);
      return 0;
    }
    this.setState({ fetchedData: null });
    let custDataMap = new Map();
    const response = await customerService.saveCustomer(
      _.pick(this.state, ["name", "contact", "gender"])
    );
    console.log(
      "response from server after adding another customer is ,",
      response
    );
    console.log(this.state);
    // console.log("fetched CustomerID is: " + jsonMap["_id"]);

    let tableDataCopy = [].concat(this.state.tableData);
    await this.updateTableData(
      tableDataCopy,
      this.createData(
        response.data["_id"],
        this.state.name,
        this.state.gender,
        this.state.contact
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
    const response = await customerService.getCustomers();
    let dataList = response.data;
    this.setState({ tableData: dataList ?? [] });
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
                name="name"
                id="customerName"
                label="Customer Name"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.name}
                error={this.errorBoolsList[0]}
              />
            </div>
            <div>
              <TextField
                name="contact"
                id="mobNo"
                label="Contact No."
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.contact}
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
          <Alert onClose={this.closeSnackBar} severity="success">
            Customer Deleted!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default EnquiryForm;
