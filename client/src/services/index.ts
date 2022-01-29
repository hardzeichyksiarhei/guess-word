import * as CategoryService from "./category.service";

export { CategoryService };

const defaultConfig = {
  payload: {},
  tm: 2000,
  isReject: false,
  error: new Error("Fake Error"),
};
export const fakeRequest = (config = {}) => {
  return new Promise((resolve, reject) => {
    const c = { ...defaultConfig, ...config };
    setTimeout(() => {
      if (c.isReject) reject(c.error);
      else resolve(c.payload);
    }, c.tm);
  });
};
