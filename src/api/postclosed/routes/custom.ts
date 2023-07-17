export default {
  routes: [
    {
      method: "GET",
      path: "/postcloseds/findByPost/:postId",
      handler: "postclosed.findByPost",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
