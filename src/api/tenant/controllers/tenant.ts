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

        if (!user?.tenant?.id || user?.role.type != "admin") {
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
    async findOne(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (!user?.tenant?.id || user?.role.type != "admin") {
          return ctx.badRequest();
        }
        let filters = {};
        if (ctx.request.query.filters) {
          filters = ctx.request.query.filters;
        }
        const tenants = await strapi.query("api::tenant.tenant").findOne({
          where: {
            ...filters,
            id: ctx.request.params.id,
          },
          populate: { logo: true, banner: true },
        });
        
        return tenants;
      } catch (err) {
        return ctx.unauthorized();
      }
    },

    async create(ctx) {
      try {
        const user = await GetTenantUserJwt();
       
        if (user?.role.type != "admin") {
          return ctx.notAcceptable(
            "Usuário sem permissão para cadastrar TENANT"
          );
        }
        return super.create(ctx);
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
    async update(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (user?.role.type != "admin") {
          return ctx.notAcceptable(
            "Usuário sem permissão para cadastrar TENANT"
          );
        }
        return super.update(ctx);
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
  })
);
