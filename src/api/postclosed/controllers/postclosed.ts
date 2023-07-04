/**
 * postclosed controller
 */

import { factories } from "@strapi/strapi";

import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::postclosed.postclosed",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const user = await GetTenantUserJwt();

        if (user?.role.name != "admin") {
          const post = await strapi.query("api::post.post").findOne({
            where: {
              id: ctx.request.body.data.post,
            },
            populate: {
              users: {
                where: {
                  id: ctx.request.body.data.user,
                },
                select: ["id"],
              },
            },
          });

          const userPost = post.users.find(
            (user) => user.id == ctx.request.body.data.user
          );

          if (!post || !userPost) {
            return ctx.notAcceptable(
              "Usuário sem permissão para finalizar o post"
            );
          }
        }
        return super.create(ctx);
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },

    async update(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (user?.role.name != "admin") {
          const postclosed = await strapi
            .query("api::postclosed.postclosed")
            .findOne({
              where: {
                id: ctx.request.params.id,
                tenant: user.tenant.id,
                user: user.id,
              },
              populate: {
                user: {
                  where: {
                    id: user.id,
                  },
                  select: ["id"],
                },
              },
            });

          if (!postclosed || !postclosed?.user?.id) {
            return ctx.notAcceptable(
              "Usuário sem permissão para finalizar o post"
            );
          }
        }

        return super.update(ctx);
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
  })
);
