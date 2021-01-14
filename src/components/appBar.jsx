import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import authService from "../services/authService";
import { useHistory } from "react-router-dom";

const MyAppBar = (props) => {
  const history = useHistory();

  async function logOutUser() {
    authService.logout();
    history.push("/");
  }
  return (
    <AppBar position="static" className={"topAppBar"}>
      <Toolbar className={"appBar-toolBar"}>
        {props.user ? (
          <Button color="inherit" onClick={logOutUser}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
