import React, { Component } from "react";
import { Outlet } from "react-router-dom";

class EmptyLayout extends Component {
  render() {
    return (
      <div className="empty-layout">
        <Outlet />
      </div>
    );
  }
}

export default EmptyLayout;
