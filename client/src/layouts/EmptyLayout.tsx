import React from "react";
import { Outlet } from "react-router-dom";

const EmptyLayout: React.FC = () => {
  return (
    <div className="empty-layout">
      <Outlet />
    </div>
  );
};

export default EmptyLayout;
