/**
 * A set of functions called "actions" for `users`
 */

import GetTenantUserJwt from "../../../utils/tenant";

export default {
  async find(ctx) {
    const user = await GetTenantUserJwt();
    if (user.role.name != "admin") {
      return ctx.notAcceptable("Usuário sem permissão para consultar usuários");
    }

    return await await strapi.query("plugin::users-permissions.user").findMany({
      where: {
        tenant: user.tenant.id,
      },
      populate: ["tenant", "role", "areas"],
    });
  },
  async findOne(ctx) {
    const user = await GetTenantUserJwt();
    if (user.role.name != "admin") {
      return ctx.notAcceptable("Usuário sem permissão para consultar usuários");
    }

    return await await strapi.query("plugin::users-permissions.user").findOne({
      where: {
        tenant: user.tenant.id,
        id: ctx.request.params.id,
      },
      populate: ["tenant", "role", "areas"],
    });
  },
  async me(ctx) {
    const user = await GetTenantUserJwt();
    return user;
  },
  async findMe(ctx) {
    const user = await GetTenantUserJwt();
    return user;
  },
  async updateCurrentTenant(ctx) {
    const user = await GetTenantUserJwt();
    return await strapi.query("plugin::users-permissions.user").update({
      where: { id: ctx.request.params.id },
      data: ctx.request.body.data,
    });
  },
  async updatePassword(ctx) {
    const user = await GetTenantUserJwt();
    const password = ctx.request.body.data.password;
    const confirmPassword = ctx.request.body.data.confirmPassword;

    if (password != confirmPassword) {
      return ctx.notAcceptable("os passwords não são iguais");
    }
    return await strapi.query("plugin::users-permissions.user").update({
      where: { id: user.id },
      data: {
        password: password,
      },
    });
  },
};
