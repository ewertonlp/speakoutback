/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const tenant = await strapi.query("api::tenant.tenant").findOne({
          where: {
            id: ctx.request.body.data.tenant,
          },
        });
        if (!tenant) {
          return ctx.notAcceptable("user no tenant valid");
        }
        const response = super.create(ctx);
        return response;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
  })
);
