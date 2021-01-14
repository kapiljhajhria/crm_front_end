import React, { Component, useEffect } from "react";

export default function LogOut() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return null;
}
