/**
 * postaction controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::postaction.postaction",
  ({ strapi }) => ({
    async find(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
      };
      return await strapi.query("api::postclosed.postclosed").findMany({
        where: filter,
        populate: {
          tenant: true,
          post: true,
          media: true,
          postactionsdetails: true,
        },
      });
    },
    async findOne(ctx) {
      const user = await GetTenantUserJwt();
      const filter = {
        tenant: user.tenant.id,
        id: ctx.request.params.id,
      };
      return await strapi.query("api::postclosed.postclosed").findOne({
        where: filter,
        populate: {
          tenant: true,
          post: true,
          media: true,
          postactionsdetails: true,
        },
      });
    },
  })
);
