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

      return await strapi.query("api::postaction.postaction").findMany({
        populate: {
          post: {
            populate: {
              tenant: true,
            },
          },
          media: true,
          postactionsdetails: true,
        },
      });
    },
    async findOne(ctx) {
      const user = await GetTenantUserJwt();
      const filter = { id: ctx.request.params.id };
      return await strapi.query("api::postaction.postaction").findOne({
        where: filter,
        populate: {
          post: {
            populate: {
              tenant: true,
            },
          },
          media: true,
          postactionsdetails: true,
        },
      });
    },

    async findByPost(ctx) {
      const user = await GetTenantUserJwt();
      const { postId } = ctx.request.params;
      if (!postId) {
        return ctx.notAcceptable("Id do post é necessario");
      }

      return await strapi.query("api::postaction.postaction").findMany({
        where: {
          tenant: user.tenant.id,
          post: postId,
        },
        populate: {
          media: true,
        },
      });
    },
  })
);
