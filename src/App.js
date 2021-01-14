import React, { useEffect, useState } from "react";
import "./App.css";
import CrmHome from "./components/CrmHome/index";
import ProtectedRoute from "./components/common/protectedRoute";
import { Route, Switch, useHistory } from "react-router-dom";
import EnquiryForm from "./components/EnquiryForm/index";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./components/logout";
import authService from "./services/authService";
import MyAppBar from "./components/appBar";

function App(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div className="App">
      <MyAppBar user={user} />
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
