import axios from "../plugins/axios";

import { Category } from "../interfaces/categoryInterface";

export const getAll = async () => {
  const { data } = await axios.get<Category[]>("categories");
  return data;
};
