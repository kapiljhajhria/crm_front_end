import { Divider } from "@material-ui/core";
import React, { Component, useEffect } from "react";

export default function LogOut() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);
  return null;
}
