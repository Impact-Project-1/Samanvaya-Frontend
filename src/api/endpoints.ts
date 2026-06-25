export const endpoints = {
  categories: {
    base: "/api/v1/categories",
  },
  vendors: {
    base: "/api/v1/vendors",
    byId: (id: string) => `/api/v1/vendors/${id}`,
    filter: "/api/v1/vendors/filter/",
  },
};
