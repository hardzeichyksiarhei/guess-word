import React from "react";
import { List } from "antd";

import { Category } from "../../interfaces/categoryInterface";

import CategoryItem from "./CategoryItem";

import "./style.scss";
import { observer } from "mobx-react-lite";

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = observer(
  ({ categories }) => {
    return (
      <List
        className="categories-list"
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category: Category) => (
          <CategoryItem category={category} />
        )}
      />
    );
  }
);

export default CategoriesList;
