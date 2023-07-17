/**
 * postclosed controller
 */

import { factories } from "@strapi/strapi";

import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::postclosed.postclosed",
  ({ strapi }) => ({
    async find(ctx) {
      const user = await GetTenantUserJwt();
      const { filter } = ctx.request.query;

      const filters = {
        tenant: user.tenant.id,
        ...filter,
      };

      return await strapi.query("api::postclosed.postclosed").findMany({
        where: filters,
        populate: {
          tenant: true,
          post: true,
          media: true,
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
        },
      });
    },
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
    async findByPost(ctx) {
      const user = await GetTenantUserJwt();
      const { postId } = ctx.request.params;
      if (!postId) {
        return ctx.notAcceptable("Id do post é necessario");
      }
      const filters = {};

      return await strapi.query("api::postclosed.postclosed").findMany({
        where: {
          tenant: user.tenant.id,
          post: postId,
        },
        populate: {
          tenant: true,
          post: true,
          media: true,
        },
      });
    },
  })
);
