

export default async function GetTenantUserJwt() {
  const ctx = strapi.requestContext.get();
  const tokenUser = await strapi.plugins[
    "users-permissions"
  ].services.jwt.getToken(ctx);

  if (!tokenUser) {
    return ctx.badRequest("Token jwt invalido");
  }

  const { id, isAdmin = false } = tokenUser;
  const user = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    id,
    {
      populate: ["tenant", "role"],
    }
  );

  return user;
}
