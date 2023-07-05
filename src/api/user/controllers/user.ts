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
};
