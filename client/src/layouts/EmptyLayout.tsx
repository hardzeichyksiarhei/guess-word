import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const EmptyLayout: React.FC = () => {
  return (
    <Layout className="empty-layout">
      <Content className="empty-layout-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default EmptyLayout;
