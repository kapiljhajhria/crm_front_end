import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
const _ = require("lodash");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const EnquiryForm = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    gender: "male",
    contact: "",
    fetchedData: "",
    tableData: [],
    deletingCustList: [],
    openSnackBar: false,
    lastDeletedCustomer: {},
    showUndoIndicator: false,
  });
  const [open, setOpen] = React.useState(false);
  const [errorBoolsList, setErrorBoolsList] = useState([false, false]);

  const showSnackBar = () => {
    setState({ ...state, openSnackBar: true });
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state.contact, openSnackBar: false });
  };

  const createNewCustFromRespData = ({ _id, name, gender, contact }) => {
    return { _id, name, gender, contact };
  };

  const deleteCustomerId = async (custId, idx) => {
    let customerDataWithIndex = {};
    customerDataWithIndex.data = state.tableData[idx];
    customerDataWithIndex.index = idx;
    //step 1 : add cust id to deleting list, so that indicator can be shown for deleting item
    setState({
      ...state,
      deletingCustList: state.deletingCustList.concat(custId),
    });

    //step2: remove that customer from local table and also make network request to remove it from server.

    const resp = await customerService.deleteCustomer(custId);
    setState({
      ...state,
      tableData: state.tableData.filter((cust) => cust["_id"] !== custId),
      deletingCustList: state.deletingCustList.filter((id) => id !== custId),
    });

    showSnackBar();
  };

  const validateData = () => {
    let tempBoolsList = [false, false];
    let alertWarning = [];
    if (state.name.length === 0) {
      alertWarning.push("Customer Name can't be empty");
      tempBoolsList[0] = true;
    }
    if (state.contact.length === 0) {
      alertWarning.push("Contact number can't be empty");
      tempBoolsList[1] = true;
    }
    if (isNaN(state.contact)) {
      alertWarning.push("Please enter valid mob number");
      tempBoolsList[1] = true;
    }
    if (`${parseInt(state.contact)}`.length !== 10) {
      alertWarning.push("Contact Number needs to be of 10 digit");
      tempBoolsList[1] = true;
    }

    if (alertWarning.length > 0) alert(alertWarning.join("\n"));
    setErrorBoolsList(tempBoolsList);
    return alertWarning.length === 0;
  };

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const genderList = ["male", "female", "others", "prefer not to say"];

  const updateTableData = async (tableArray, elementoBeAdded, position) => {
    console.log(
      "update table data called with ",
      tableArray,
      elementoBeAdded,
      position
    );
    if (position === undefined) tableArray.push(elementoBeAdded);
    else tableArray.splice(position, 0, elementoBeAdded);
    setState({
      ...state,
      tableData: tableArray || [],
      lastDeletedCustomer: {},
    });
  };

  const getCustomerIdAndSaveData = async () => {
    //validate data and show alert window
    if (!validateData()) {
      console.log("input not valid");
      ///TODO:
      return 0;
    }
    setState({ ...state, fetchedData: null });
    let response;
    try {
      setOpen(true);
      response = await customerService.saveCustomer(
        _.pick(state, ["name", "contact", "gender"])
      );
      setOpen(false);
    } catch (ex) {
      setOpen(false);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      return;
    }
    // console.log("fetched CustomerID is: " + jsonMap["_id"]);

    let tableDataCopy = [].concat(state.tableData);

    setState({
      ...state,
      tableData: [...state.tableData, createNewCustFromRespData(response.data)],
      customerName: "",
      gender: "male",
      mobNo: "",
      fetchedData: "",
    });
  };

  const fetchFormData = async () => {
    let response;
    try {
      setOpen(true);
      response = await customerService.getCustomers();
      setOpen(false);
    } catch (ex) {
      setOpen(false);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data + "/n please refresh page");
      }
      return;
    }
    let dataList = response.data;
    setState({ ...state, tableData: dataList });
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <React.Fragment>
      <div>
        <Paper className="paper">
          <form>
            <div>
              <TextField
                name="name"
                id="customerName"
                label="Customer Name"
                variant="outlined"
                onChange={handleInputChange}
                value={state.name}
                error={errorBoolsList[0]}
              />
            </div>
            <div>
              <TextField
                name="contact"
                id="mobNo"
                label="Contact No."
                variant="outlined"
                onChange={handleInputChange}
                value={state.contact}
                error={errorBoolsList[1]}
              />
            </div>
            <div>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name={"gender"}
                value={state.gender}
                onChange={handleInputChange}
                color="secondary"
              >
                {genderList.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </div>
          </form>
          {state.fetchedData === null ? (
            <div>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => getCustomerIdAndSaveData()}
          >
            Save info
          </Button>
              {state.showUndoIndicator ? (
                <div>
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Paper>
        {state.tableData.length !== 0 ? (
          <SimpleTable
            className="simpleTable"
            tableData={state.tableData}
            deletingCustList={state.deletingCustList}
            deleteCustomerId={(custId, idx) => deleteCustomerId(custId, idx)}
          />
        ) : (
          ""
        )}
        <Snackbar
          open={state.openSnackBar}
          autoHideDuration={3000}
          onClose={closeSnackBar}
        >
          <Alert onClose={closeSnackBar} severity="success">
            Customer Deleted!
          </Alert>
        </Snackbar>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default EnquiryForm;
