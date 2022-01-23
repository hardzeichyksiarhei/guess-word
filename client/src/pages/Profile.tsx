import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <div className="settings-page">
      <Row justify="space-between" align="middle">
        <Col flex="3">
          <div className="page-title">Раздевалка</div>
        </Col>
        <Col flex="1">
          <Link to="/rules">
            <Button
              className="text-uppercase"
              type="primary"
              shape="round"
              block
            >
              Правила
            </Button>
          </Link>
        </Col>
      </Row>

      <div className="page-description">Настройка пользователя</div>
      <div className="page-content">
        <Link to="/categories">
          <Button
            className="mt-2 text-uppercase"
            type="primary"
            shape="round"
            block
          >
            Далее
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
