import React from "react";
import './styles.css'
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


export default class CrmHome extends React.Component {
    state = {
        email: "",
        pswd: "",
        rePswd: "",
        selectedTab: 0,
        warning: ""

    };
    clearAllFields = () => {
        this.setState({
            email: "",
            pswd: "",
            rePswd: "",
            warning: ""
        })
    }

    validateEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            return ""
        } else return "Invalid email"

    }

    matchPasswords() {
        if (this.state.pswd !== this.state.rePswd)
            return "passwords don't match"
    }

    logInUser = async (e) => {
        e.preventDefault();
        let alertMsg = "";
        if (this.state.email.length === 0) {
            alertMsg = "Please enter an email id"
        } else
            alertMsg = this.validateEmail()

        if (this.state.pswd.length === 0)
            alertMsg = alertMsg + "\n Please enter your password"
        if (alertMsg.length !== 0) {
            alert(alertMsg)
            return;
        }

        let jsonMap = await this.makePostRequest('http://localhost:5000/login', {
            "email": this.state.email,
            "pswd": this.state.pswd
        });
        if (jsonMap.result === "noEmail") {
            alertMsg = "Email id doesn't exist, please sign up first"
        } else if (jsonMap.result === "passwordError") {
            alertMsg = "wrong password, please check your password"
        } else if (jsonMap.result === "loggedIn") {
            alertMsg = "You have logged in"
        }

        // if (alertMsg.length !== 0) {
        //     alert(alertMsg)
        //     return;
        // }

    }
    signUpUser = async () => {
        //validate if password matches or not
        let alertMsg = "";
        if (this.state.email.length === 0) {
            alertMsg = "Please enter an email id"
        } else
            alertMsg = this.validateEmail()

        if (this.state.pswd.length === 0) {
            alertMsg = alertMsg + "\nPlease enter a password"
        } else if (this.state.pswd !== this.state.rePswd) {
            alertMsg = alertMsg + "\nPasswords don't match"
        }


        if (alertMsg.trim().length !== 0) {
            alert(alertMsg)
            return;
        }
        //proceed with sending sign up details to server if all fields are filled correctly

        let userSignUpDetails = new Map();
        userSignUpDetails["email"] = this.state.email;
        userSignUpDetails["pswd"] = this.state.pswd;
        let jsonMap = await this.makePostRequest('http://localhost:5000/signup', userSignUpDetails);
        // and then take user to login tab
        console.log("response of sign up post request")
        console.log(jsonMap)
        if (jsonMap.result === "failed")
            alertMsg = "failed to sign up, please try again"
        if (jsonMap.result === "duplicateEmail")
            alertMsg = "Email id already, exist, please use another email id  or reset password"
        if (alertMsg.trim().length !== 0) {
            alert(alertMsg)
            return;
        }
        if (alertMsg.length === 0)
            this.setState({selectedTab: 0})
    }
    makePostRequest = async (url, dataAsMap) => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(dataAsMap)
        })
        let jsonMap = await response.json();
        return jsonMap;
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    changeTab = (tabNo) => {
        this.setState({
            selectedTab: tabNo
        })
        this.clearAllFields();
    }

    render() {

        return (
            <div className={"crmHome-main"}>
                <div className="crmHome-title">
                    Best CRM App
                </div>
                <Paper className={"paperForm"}>
                    <Tabs value={this.state.selectedTab} onChange={(ev, tabNo) => this.changeTab(tabNo)}
                          aria-label="simple tabs example">
                        <Tab label="LOGIN"/>
                        <Tab label="SIGN UP"/>
                    </Tabs>

                    <div className="loginView tabView" hidden={this.state.selectedTab !== 0}>
                        <TextField name="email" id="logIn-email" label="email" variant="outlined"
                                   onChange={this.handleInputChange} value={this.state.email}/>

                        <TextField name="pswd" id="logIn-pswd" label="password" variant="outlined" type={"password"}
                                   onChange={this.handleInputChange} value={this.state.pswd}/>

                        <Button color="primary" variant="contained"
                                onClick={(e) => this.logInUser(e)}>log in
                        </Button>
                    </div>
                    <div className="signupView tabView" hidden={this.state.selectedTab !== 1}>
                        <TextField name="email" id="signUp-email" label="email" variant="outlined"
                                   onChange={this.handleInputChange} value={this.state.email}
                            // error={this.errorBoolsList[0]}
                        />

                        <TextField name="pswd" id="signUp-pswd" label="password" variant="outlined" type={"password"}
                                   onChange={this.handleInputChange} value={this.state.pswd}/>

                        <TextField name="rePswd" id="signUpRe-pswd" label="password" variant="outlined"
                                   type={"password"}
                                   onChange={this.handleInputChange} value={this.state.rePswd}/>

                        <Button color="primary" variant="contained"
                                onClick={() => this.signUpUser()}>Sign Up
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

