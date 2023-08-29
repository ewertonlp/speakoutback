/**
 * A set of functions called "actions" for `report`
 */

import GetTenantUserJwt from "../../../utils/tenant";

export default {
  posts: async (ctx, next) => {
    try {
      const user = await GetTenantUserJwt();
      const { filter } = ctx.request.query;

      const filters = {
        tenant: user.tenant.id,
        ...filter,
      };
      console.log(filters, ctx.request.query);
      const response = await strapi.query("api::post.post").findMany({
        where: filters,
      });
      return response.length || 0;
    } catch (err) {
      ctx.body = err;
    }
  },
};
