import React from "react";
import { Button, List } from "antd";

import categoryState from "../../store/categoryState";

import { Category } from "../../interfaces/categoryInterface";

import "./style.scss";
import { observer } from "mobx-react-lite";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = observer(({ category }) => {
  const handleToggleCategory = (category: Category) => {
    categoryState.toggleCategory(category);
  };

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <img
            className="category-item__image img-fluid"
            src={`./img/categories/${category.slug}.jpg`}
            alt={category.slug}
          />
        }
        title={<span style={{ fontSize: 18 }}>{category.label}</span>}
        description={`Количество слов: ${category.words.length}`}
      />
      <Button
        type="primary"
        danger={categoryState.category?.id === category.id}
        onClick={() => handleToggleCategory(category)}
      >
        {categoryState.category?.id !== category.id ? "Выбрать" : "Отменить"}
      </Button>
    </List.Item>
  );
});

export default CategoryItem;
