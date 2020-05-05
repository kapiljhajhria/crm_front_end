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

    };
    clearAllFields = () => {
        this.setState({
            email: "",
            pswd: "",
            rePswd: "",
        })
    }

    logInUser = () => {

    }
    signUpUser = () => {
        //validate if password matches or not

        // and then take user to login tab
        this.setState({selectedTab: 0})
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
                                onClick={() => this.logInUser()}>log in
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

