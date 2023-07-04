/**
 * postclosed controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::postclosed.postclosed', ({ strapi }) => ({
    async create(ctx) {
      try {
        if (!ctx.request.body.data.tenant) {
          return ctx.notAcceptable("Tenant é obrigatório");
        }
        const tenant = await strapi.query("api::tenant.tenant").findOne({
          where: {
            id: ctx.request.body.data.tenant,
          },
        });
        if (!tenant) {
          return ctx.notAcceptable("Usuário sem tenant");
        }

        const post = await strapi.query("api::post:post").findOne({
            where: {
                id: ctx.request.body.data.post
            },
            populate: {
                users: {
                    where: {
                        id: ctx.request.body.data.user
                    },
                    select: ['id']
                }
            }
        })

        const user = post.data.users.find(user => user.id == ctx.request.body.data.user)

        if (!post || !user) {
            return ctx.notAcceptable("Usuário sem permissão para finalizar o post");
          }
       
        const response = super.create(ctx);
        return response;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }}
    }))
