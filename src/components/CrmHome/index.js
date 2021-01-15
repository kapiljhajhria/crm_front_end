import authService from "../../services/authService";
import * as userService from "../../services/userService";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const CrmHome = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
    selectedTab: 0,
    warning: "",
  });
  const [open, setOpen] = React.useState(false);
  const _apiUrl = config.api_url;

  const clearAllFields = (rest) => {
    setState({
      ...state,
      email: "",
      name: "",
      password: "",
      rePassword: "",
      warning: "",
      ...rest,
    });
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      return "";
    } else return "Invalid email";
  };

  const matchPasswords = () => {
    if (state.password !== state.rePassword) return "passwords don't match";
  };

  const logInUser = async (e) => {
    e.preventDefault();
    let alertMsg = "";
    if (state.email.length === 0) {
      alertMsg = "Please enter an email id";
    } else alertMsg = validateEmail();

    if (state.password.length === 0)
      alertMsg = alertMsg + "\n Please enter your password";
    if (alertMsg.length !== 0) {
      alert(alertMsg);
      return;
    }

    //make request to login user
    try {
      setOpen(true);
      await authService.login(state);
      props.updateUser();
    } catch (ex) {
      setOpen(false);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      return;
    }
    if (alertMsg.length !== 0) {
      alert(alertMsg);
      return;
    }
    setOpen(false);
    props.history.push("/customers");
  };

  const signUpUser = async () => {
    //validate if password matches or not
    let alertMsg = "";
    if (state.email.length === 0) {
      alertMsg = "Please enter an email id";
    } else alertMsg = validateEmail();

    if (state.password.length === 0) {
      alertMsg = alertMsg + "\nPlease enter a password";
    } else if (state.password !== state.rePassword) {
      alertMsg = alertMsg + "\nPasswords don't match";
    }

    if (alertMsg.trim().length !== 0) {
      alert(alertMsg);
      return;
    }
    //proceed with sending sign up details to server if all fields are filled correctly

    //make request to sign up user
    try {
      setOpen(true);
      const response = await userService.register(state);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      props.updateUser();
      setOpen(false);
      props.history.push("/customers");
    } catch (ex) {
      setOpen(false);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      return;
    }
    if (alertMsg.length === 0) setState({ ...state, selectedTab: 0 });
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const changeTab = (tabNo) => {
    setState({
      ...state,
      selectedTab: tabNo,
    });
    clearAllFields({ selectedTab: tabNo });
  };

  if (authService.getCurrentUser()) return <Redirect to="/customers" />;
  return (
    <React.Fragment>
      <ToastContainer />
      <div className={"crmHome-main"}>
        <div className="crmHome-title">Best CRM App</div>
        <Paper className={"paperForm"}>
          <Tabs
            value={state.selectedTab}
            onChange={(ev, tabNo) => changeTab(tabNo)}
            aria-label="simple tabs example"
          >
            <Tab label="LOGIN" />
            <Tab label="SIGN UP" />
          </Tabs>

          <div className="loginView tabView" hidden={state.selectedTab === 1}>
            <TextField
              name="email"
              id="logIn-email"
              label="email"
              variant="outlined"
              onChange={handleInputChange}
              value={state.email}
            />

            <TextField
              name="password"
              id="logIn-password"
              label="password"
              variant="outlined"
              type={"password"}
              onChange={handleInputChange}
              value={state.password}
            />

            <Button
              color="primary"
              variant="contained"
              onClick={(e) => logInUser(e)}
            >
              log in
            </Button>
          </div>
          <div className="signupView tabView" hidden={state.selectedTab === 0}>
            <TextField
              name="name"
              id="signup-name"
              label="name"
              variant="outlined"
              onChange={handleInputChange}
              value={state.name}
              // error={errorBoolsList[0]}
            />
            <TextField
              name="email"
              id="signUp-email"
              label="email"
              variant="outlined"
              onChange={handleInputChange}
              value={state.email}
              // error={errorBoolsList[0]}
            />

            <TextField
              name="password"
              id="signUp-password"
              label="password"
              variant="outlined"
              type={"password"}
              onChange={handleInputChange}
              value={state.password}
            />

            <TextField
              name="rePassword"
              id="signUp-rePassword"
              label="password"
              variant="outlined"
              type={"password"}
              onChange={handleInputChange}
              value={state.rePassword}
            />

            <Button
              color="primary"
              variant="contained"
              onClick={() => signUpUser()}
            >
              Sign Up
            </Button>
          </div>
        </Paper>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default CrmHome;
