export default {
  routes: [
    {
      method: "GET",
      path: "/gettenantbyidentity/:identity",
      handler: "gettenantbyidentity.get",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
