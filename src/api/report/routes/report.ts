export default {
  routes: [
    {
      method: "GET",
      path: "/report/posts",
      handler: "report.posts",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // {
    //   method: "GET",
    //   path: "/report/open-posts",
    //   handler: "report.openPosts",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "GET",
    //   path: "/report/inprogress-posts",
    //   handler: "report.inprogressPosts",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "GET",
    //   path: "/report/procedent-finish-posts",
    //   handler: "report.procedentFinishPosts",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
  ],
};
