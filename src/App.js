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

  const updateUser = () => {
    const user = authService.getCurrentUser();
    setUser(user);
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="App">
      {/* <userContext> */}
      <MyAppBar user={user} updateUser={updateUser} />
      {/* </userContext> */}

      <header className="App-header">
        <Switch>
          <ProtectedRoute exact path={"/customers"} component={EnquiryForm} />

          <Route
            exact
            path="/"
            render={(props) => <CrmHome {...props} updateUser={updateUser} />}
          />
          <Route path={"/logout"} component={LogOut} />
          {/*<Route path={"/reactForms"} component={CrmHome}/>*/}
        </Switch>
      </header>
    </div>
  );
}

export default App;
