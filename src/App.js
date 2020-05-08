import React, {useEffect} from 'react';
import './App.css';
import CrmHome, {makePostRequest} from "./CrmHome";
import {Route, Switch, useHistory} from "react-router-dom";
import EnquiryForm from "./EnquiryForm";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Button} from "@material-ui/core";

function App(props) {
    const history = useHistory();

    async function logOutUser() {
        console.log("logging out user")
        let result = await makePostRequest("http://localhost:5000/logout", {
            "reqType": "log me out",
        })

        if (result.status === "loggedOut") {
            history.push("/")
        } else {
            alert("Error logging out, try again")
        }
    }

    useEffect(() => {
        const test = props;
        console.log("test:");
        console.log(test)
    }, []);

    return (
        <div className="App">
            <AppBar position="static" className={"topAppBar"}>
                <Toolbar className={"appBar-toolBar"}>

                    <Button color="inherit" onClick={logOutUser}>Login</Button>
                </Toolbar>
            </AppBar>
            <header className="App-header">
                <Switch>

                    <Route exact path={"/customers"} component={EnquiryForm}/>

                    <Route path={"/"} component={CrmHome}/>
                    {/*<Route path={"/reactForms"} component={CrmHome}/>*/}

                </Switch>
            </header>
        </div>

    );
}

export default App;
