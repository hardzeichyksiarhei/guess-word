import axios from "../plugins/axios";

import { ICategory } from "../interfaces/categoryInterface";

export const getAll = async () => {
  const { data } = await axios.get<ICategory[]>("categories");
  return data;
};
