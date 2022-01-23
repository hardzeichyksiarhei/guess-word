import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const DefaultLayout: React.FC = () => {
  return (
    <Layout className="default-layout">
      <Content className="default-layout-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
