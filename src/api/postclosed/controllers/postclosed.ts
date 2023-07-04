/**
 * postclosed controller
 */

import { factories } from '@strapi/strapi'
import postclosed from '../routes/postclosed';

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
        const userOwner = await strapi.query("plugin::users-permissions.user").findOne({
            where: {
                id: ctx.request.body.data.user
            },
            populate: {
                role: {
                    where: {
                        name: 'admin'
                    }
                }
            }
          })

          if(!userOwner?.role){
                const post = await strapi.query("api::post.post").findOne({
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
            
                const userPost = post.users.find(user => user.id == ctx.request.body.data.user)

                if (!post || !userPost) {
                    return ctx.notAcceptable("Usuário sem permissão para finalizar o post");
                }
        }
        return super.create(ctx);
        
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }},

      async update(ctx) {
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
          const userOwner = await strapi.query("plugin::users-permissions.user").findOne({
            where: {
                id: ctx.request.body.data.user
            },
            populate: {
                role: {
                    where: {
                        name: 'admin'
                    }
                }
            }
          })
          if(!userOwner?.role){
            const postclosed = await strapi.query("api::postclosed.postclosed").findOne({
                where: {
                    id: ctx.request.params.id,
                    tenant: ctx.request.body.data.tenant,
                    user: ctx.request.body.data.user
                },
                populate: {
                    user: {
                        where: {
                            id: ctx.request.body.data.user
                        },
                        select: ['id']
                    }
                }
            })
            
            if (!postclosed || !postclosed?.user?.id ) {
                return ctx.notAcceptable("Usuário sem permissão para finalizar o post");
                }
        }
         
        return super.update(ctx);
           
        } catch (err) {
          return ctx.badRequest(`${err.message}`, JSON.stringify(err));
        }}
    }))
