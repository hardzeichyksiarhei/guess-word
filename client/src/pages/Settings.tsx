import React from "react";

import { Row, Col } from "antd";

import Toolbar from "../components/Toolbar";

const Settings = () => {
  return (
    <div className="settings-page page">
      <Toolbar className="page__toolbar" title={"Настройки"} />

      <div className="page__content">
        <Row gutter={30}>
          <Col span={24}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            cum assumenda possimus, earum alias ratione repellendus quos, id,
            beatae at porro voluptates natus pariatur vitae accusamus nisi quasi
            mollitia doloremque.
          </Col>
        </Row>
      </div>
      <div className="page__footer">
        <Row gutter={20}></Row>
      </div>
    </div>
  );
};

export default Settings;
