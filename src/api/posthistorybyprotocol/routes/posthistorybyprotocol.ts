export default {
  routes: [
    {
      method: "GET",
      path: "/posthistorybyprotocol/:protocol",
      handler: "posthistorybyprotocol.get",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
