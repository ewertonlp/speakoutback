export default {
  routes: [
    {
      method: "GET",
      path: "/cep/:cep",
      handler: "cep.search",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
