import React from "react";
import { Button, List } from "antd";

import { ICategory } from "../../interfaces/categoryInterface";

import "./style.scss";
import { observer } from "mobx-react-lite";
import gameState from "../../store/gameState";

interface CategoryItemProps {
  category: ICategory;
}

const CategoryItem: React.FC<CategoryItemProps> = observer(({ category }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <img
            className="category-item__image img-fluid"
            src={`/img/categories/${category.slug}.jpg`}
            alt={category.slug}
          />
        }
        title={<span style={{ fontSize: 18 }}>{category.label}</span>}
        description={`Количество слов: ${category.words.length}`}
      />
      <Button
        type="primary"
        danger={gameState.checkSelectedCategory(category)}
        onClick={() => gameState.toggleGameCategory(category)}
      >
        {!gameState.checkSelectedCategory(category) ? "Выбрать" : "Отменить"}
      </Button>
    </List.Item>
  );
});

export default CategoryItem;
