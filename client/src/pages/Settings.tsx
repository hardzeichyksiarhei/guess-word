import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col } from "antd";

import Toolbar from "../components/Toolbar";
import categoryState from "../store/categoryState";
import CategoriesList from "../components/categories/CategoriesList";

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
        <Row gutter={20}></Row>
      </div>
    </div>
  );
});

export default Settings;
