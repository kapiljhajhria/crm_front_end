import authService from "../../services/authService";
import * as userService from "../../services/userService";
import React from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";

export default class CrmHome extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    rePassword: "",
    selectedTab: 0,
    warning: "",
  };

  _apiUrl = config.api_url;

  clearAllFields = () => {
    this.setState({
      email: "",
      name: "",
      password: "",
      rePassword: "",
      warning: "",
    });
  };

  validateEmail = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      return "";
    } else return "Invalid email";
  };

  matchPasswords() {
    if (this.state.password !== this.state.rePassword)
      return "passwords don't match";
  }

  logInUser = async (e) => {
    e.preventDefault();
    let alertMsg = "";
    if (this.state.email.length === 0) {
      alertMsg = "Please enter an email id";
    } else alertMsg = this.validateEmail();

    if (this.state.password.length === 0)
      alertMsg = alertMsg + "\n Please enter your password";
    if (alertMsg.length !== 0) {
      alert(alertMsg);
      return;
    }

    //make request to login user
    try {
      await authService.login(this.state);
      this.props.updateUser();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      return;
    }
    if (alertMsg.length !== 0) {
      alert(alertMsg);
      return;
    }
    this.props.history.push("/customers");
  };

  signUpUser = async () => {
    //validate if password matches or not
    let alertMsg = "";
    if (this.state.email.length === 0) {
      alertMsg = "Please enter an email id";
    } else alertMsg = this.validateEmail();

    if (this.state.password.length === 0) {
      alertMsg = alertMsg + "\nPlease enter a password";
    } else if (this.state.password !== this.state.rePassword) {
      alertMsg = alertMsg + "\nPasswords don't match";
    }

    if (alertMsg.trim().length !== 0) {
      alert(alertMsg);
      return;
    }
    //proceed with sending sign up details to server if all fields are filled correctly

    //make request to sign up user
    try {
      const response = await userService.register(this.state);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      this.props.updateUser();
      this.props.history.push("/customers");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
      return;
    }
    if (alertMsg.length === 0) this.setState({ selectedTab: 0 });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  changeTab = (tabNo) => {
    this.setState({
      selectedTab: tabNo,
    });
    this.clearAllFields();
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/customers" />;
    return (
      <React.Fragment>
        <ToastContainer />
        <div className={"crmHome-main"}>
          <div className="crmHome-title">Best CRM App</div>
          <Paper className={"paperForm"}>
            <Tabs
              value={this.state.selectedTab}
              onChange={(ev, tabNo) => this.changeTab(tabNo)}
              aria-label="simple tabs example"
            >
              <Tab label="LOGIN" />
              <Tab label="SIGN UP" />
            </Tabs>

            <div
              className="loginView tabView"
              hidden={this.state.selectedTab !== 0}
            >
              <TextField
                name="email"
                id="logIn-email"
                label="email"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.email}
              />

              <TextField
                name="password"
                id="logIn-password"
                label="password"
                variant="outlined"
                type={"password"}
                onChange={this.handleInputChange}
                value={this.state.password}
              />

              <Button
                color="primary"
                variant="contained"
                onClick={(e) => this.logInUser(e)}
              >
                log in
              </Button>
            </div>
            <div
              className="signupView tabView"
              hidden={this.state.selectedTab !== 1}
            >
              <TextField
                name="name"
                id="signup-name"
                label="name"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.name}
                // error={this.errorBoolsList[0]}
              />
              <TextField
                name="email"
                id="signUp-email"
                label="email"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.email}
                // error={this.errorBoolsList[0]}
              />

              <TextField
                name="password"
                id="signUp-password"
                label="password"
                variant="outlined"
                type={"password"}
                onChange={this.handleInputChange}
                value={this.state.password}
              />

              <TextField
                name="rePassword"
                id="signUp-rePassword"
                label="password"
                variant="outlined"
                type={"password"}
                onChange={this.handleInputChange}
                value={this.state.rePassword}
              />

              <Button
                color="primary"
                variant="contained"
                onClick={() => this.signUpUser()}
              >
                Sign Up
              </Button>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}
