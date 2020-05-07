import React from 'react';
import './App.css';
import CrmHome from "./CrmHome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import EnquiryForm from "./EnquiryForm";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Switch>

                        <Route exact path={"/customers"} component={EnquiryForm}/>

                        <Route path={"/"} component={CrmHome}/>
                        {/*<Route path={"/reactForms"} component={CrmHome}/>*/}

                    </Switch>
                </header>
            </div>
        </Router>
    );
}

export default App;
