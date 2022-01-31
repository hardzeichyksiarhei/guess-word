import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "antd";

import Toolbar from "../components/Toolbar";
import categoryState from "../store/categoryState";
import CategoriesList from "../components/categories/CategoriesList";
import gameState from "../store/gameState";

const Settings = observer(() => {
  useEffect(() => {
    categoryState.fetchCategories();
  }, []);

  return (
    <div className="settings-page page">
      <Toolbar className="page__toolbar" title={"Настройки"} />

      <div className="page__content">
        <Row gutter={30}>
          <Col span={24}>
            <CategoriesList categories={categoryState.categories} />
          </Col>
        </Row>
      </div>
      <div className="page__footer">
        <Row>
          <Col span={24}>
            <Button
              className="mt-2 text-uppercase"
              type="primary"
              shape="round"
              size="large"
              disabled={!gameState.game.settings.categories.length}
              block
            >
              Играть
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default Settings;
