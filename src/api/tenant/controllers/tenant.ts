/**
 * tenant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::tenant.tenant",
  ({ strapi }) => ({
    async find(ctx) {
      let filters = {};
      if (ctx.request.query.filters) {
        filters = ctx.request.query.filters;
      }
      const tenants = await strapi.query("api::tenant.tenant").findMany({
        where: filters,
        populate: { logo: true, banner: true },
      });

      return tenants;
    },

    async findOne(ctx) {},
  })
);
