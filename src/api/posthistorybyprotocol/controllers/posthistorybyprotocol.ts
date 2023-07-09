/**
 * A set of functions called "actions" for `gettenantbyidentity`
 */

export default {
  get: async (ctx, next) => {
    try {
      const { query, params } = ctx.request;
      if (params.protocol) {
        const post = await strapi.query("api::post.post").findOne({
          where: {
            protocol: params.protocol,
          },
          populate: {
            posthistories: {
              populate: {
                media: {
                  select: ["id", "formats", "width", "height", "url"],
                },
                user: {
                  select: ["id", "fullname", "email", "username"],
                },
              },
              orderBy: { id: "desc" },
            },
            postclosed: true,
            media: {
              select: ["id", "formats", "width", "height", "url"],
            },
          },
        });
        return (ctx.body = post);
      }

      return ctx.notAcceptable("user no post valid");
    } catch (err) {
      ctx.body = err;
    }
  },
};
