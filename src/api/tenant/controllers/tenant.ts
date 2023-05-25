/**
 * tenant controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::tenant.tenant",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (!user?.tenant?.id) {
          return ctx.badRequest();
        }
        let filters = {};
        if (ctx.request.query.filters) {
          filters = ctx.request.query.filters;
        }
        const tenants = await strapi.query("api::tenant.tenant").findMany({
          where: filters,
          populate: { logo: true, banner: true },
        });

        return tenants;
      } catch (err) {
        return ctx.unauthorized();
      }
    },
  })
);
