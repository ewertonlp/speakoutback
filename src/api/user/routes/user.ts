export default {
  routes: [
    {
      method: "GET",
      path: "/users",
      handler: "user.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/users/:id",
      handler: "user.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
