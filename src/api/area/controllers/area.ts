/**
 * area controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::area.area",
  ({ strapi }) => ({
    async find(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
      };
      return await strapi.query("api::area.area").findMany({
        where: filter,
        populate: {
          tenant: true,
        },
      });
    },
    async findOne(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
        id: ctx.request.params.id,
      };
      return await strapi.query("api::area.area").findOne({
        where: filter,
        populate: {
          tenant: true,
        },
      });
    },
  })
);
