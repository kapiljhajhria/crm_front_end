import React, { useEffect, useState } from "react";
import "./App.css";
import CrmHome from "./components/CrmHome/index";
import ProtectedRoute from "./components/common/protectedRoute";
import { Route, Switch, useHistory } from "react-router-dom";
import EnquiryForm from "./components/EnquiryForm/index";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./components/logout";
import authService from "./services/authService";

function App(props) {
  const history = useHistory();
  const [user, setUser] = useState({});
  async function logOutUser() {
    authService.logout();
    history.push("/");
    } else {
      alert("Error logging out, try again");
    }
  }

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div className="App">
      <AppBar position="static" className={"topAppBar"}>
        <Toolbar className={"appBar-toolBar"}>
          {user ? (
            <Button color="inherit" onClick={logOutUser}>
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <Switch>
          <ProtectedRoute exact path={"/customers"} component={EnquiryForm} />

          <Route path={"/"} component={CrmHome} />
          <Route path={"/logout"} component={LogOut} />
          {/*<Route path={"/reactForms"} component={CrmHome}/>*/}
        </Switch>
      </header>
    </div>
  );
}

export default App;
