export default {
  routes: [
    {
      method: "GET",
      path: "/postactions/findByPost/:postId",
      handler: "postaction.findByPost",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
