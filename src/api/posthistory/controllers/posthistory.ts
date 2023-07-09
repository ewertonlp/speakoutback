/**
 * posthistory controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::posthistory.posthistory",
  ({ strapi }) => ({
    async find(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
      };
      return await strapi.query("api::posthistory.posthistory").findMany({
        where: filter,
        populate: {
          tenant: true,
          post: true,
        },
      });
    },
    async findOne(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
        id: ctx.request.params.id,
      };
      return await strapi.query("api::posthistory.posthistory").findOne({
        where: filter,
        populate: {
          tenant: true,
          post: true,
        },
      });
    },
  })
);
