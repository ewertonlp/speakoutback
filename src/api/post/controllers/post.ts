/**
 * post controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async find(ctx) {
      const user = await GetTenantUserJwt();

      if (user.role.name != "admin") {
        return await strapi.query("api::post.post").findMany({
          where: {
            tenant: user.tenant.id,
            users: {
              id: {
                $eq: user.id,
              },
            },
          },
          populate: {
            users: true,
            tenant: true,
          },
        });
      }

      return await strapi.query("api::post.post").findMany({
        where: {
          tenant: user.tenant.id,
        },
        populate: {
          users: true,
          tenant: true,
        },
      });
    },
    async findOne(ctx) {
      try {
        const user = await GetTenantUserJwt();

        if (user.role.name != "admin") {
          return await strapi.query("api::post.post").findOne({
            where: {
              id: ctx.request.params.id,
              users: {
                id: {
                  $eq: user.id,
                },
              },
            },
            populate: {
              users: true,
              tenant: true,
            },
          });
        }

        return await strapi.query("api::post.post").findOne({
          where: {
            id: ctx.request.params.id,
          },
          populate: {
            users: true,
            tenant: true,
          },
        });
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
    async create(ctx) {
      try {
        if (!ctx.request.body.data.tenant) {
          return ctx.notAcceptable("tenant is required");
        }
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

    async update(ctx) {
      try {
        const user = await GetTenantUserJwt();
        const post = await strapi.query("api::post.post").findOne({
          where: {
            id: ctx.request.params.id,
          },
          populate: {
            users: {
              where: {
                id: {
                  $eq: user.id,
                },
              },
            },
          },
        });
        if (user.role.name != "admin") {
          if (!post.users?.id) {
            return ctx.notAcceptable(
              "Usuário sem permissão para atualizar o post"
            );
          }
        }

        const payload: any = {};

        if (ctx.request.body.data.status) {
          payload.status = ctx.request.body.data.status;
        }
        if (ctx.request.body.data.sensibilidade) {
          payload.sensibilidade = ctx.request.body.data.sensibilidade;
        }
        if (ctx.request.body.data.users) {
          payload.users = ctx.request.body.data.users;
        }
        const response = await strapi.query("api::post.post").update({
          where: { id: ctx.request.params.id },
          data: payload,
        });

        return response;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
  })
);
