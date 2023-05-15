export default async function GetTenantUserJwt() {
  const ctx = strapi.requestContext.get();
  const { id, isAdmin = false } = await strapi.plugins[
    "users-permissions"
  ].services.jwt.getToken(ctx);

  const user = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    id,
    {
      populate: "tenant",
    }
  );

  return user;
}
