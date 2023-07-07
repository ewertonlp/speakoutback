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
     {
      method: "GET",
      path: "/users/me",
      handler: "user.me",
      config: {
        policies: [],
        middlewares: [],
      },
    },
      {
      method: "GET",
      path: "/users/find/me",
      handler: "user.findMe",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/users/update-current-tenant/:id",
      handler: "user.updateCurrentTenant",
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
