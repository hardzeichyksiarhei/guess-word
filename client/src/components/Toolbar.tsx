import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

import playerState from "../store/playerState";

import ExitButton from "./ExitButton";

interface ToolbarProps {
  title: string;
  description?: string;
  className?: string;
}

const Toolbar = ({ title, description, className }: ToolbarProps) => {
  return (
    <Row
      className={`toolbar ${className || ""}`}
      justify="space-between"
      align="middle"
    >
      <Col flex="2">
        <div className="toolbar__title">{title}</div>
      </Col>
      <Col flex="1">
        <Row gutter={20}>
          <Col flex="2">
            <Link to={`/${playerState.currentPlayer.gameId}/rules`}>
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
          {playerState.currentPlayer.gameId ? (
            <Col flex="1">
              <ExitButton />
            </Col>
          ) : null}
        </Row>
      </Col>
      {description ? (
        <Col span={24}>
          <div className="toolbar__description">{description}</div>
        </Col>
      ) : null}
    </Row>
  );
};

export default Toolbar;
