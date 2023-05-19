/**
 * A set of functions called "actions" for `gettenantbyidentity`
 */

export default {
  get: async (ctx, next) => {
    try {
      const { query, params } = ctx.request;
      if (params.identity) {
        const tenant = await strapi.query("api::tenant.tenant").findMany({
          where: {
            identity: params.identity,
          },
          populate: {
            logo: {
              select: ["id", "formats", "width", "height", "url"],
            },
            banner: {
              select: ["id", "formats", "width", "height", "url"],
            },
          },
        });
        return (ctx.body = tenant);
      }

      return ctx.notAcceptable("user no tenant valid");
    } catch (err) {
      ctx.body = err;
    }
  },
};
