/**
 * business controller
 */

import { factories } from "@strapi/strapi";
import GetTenantUserJwt from "../../../utils/tenant";
import address from "../../address/controllers/address";
import AddressService from "../../../utils/address";
import BusinessService from "../../../utils/business";

export default factories.createCoreController(
  "api::business.business",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (!user.tenant.id) {
          return ctx.notAcceptable("user no tenant valid");
        }
        let filters = {};
        if (ctx.request.query.filters) {
          filters = ctx.request.query.filters;
        }
        filters["tenant"] = user.tenant.id;
        const businesses = await strapi
          .query("api::business.business")
          .findMany({
            where: filters,
            populate: { address: true },
          });

        return businesses;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },

    async findOne(ctx) {
      try {
        const { id } = ctx.request.params;
        if (!id) {
          return ctx.notAcceptable("is user is required");
        }
        const user = await GetTenantUserJwt();
        if (!user.tenant.id) {
          return ctx.notAcceptable("user no tenant valid");
        }

        const business = await strapi.query("api::business.business").findOne({
          where: {
            tenant: user.tenant.id,
            id,
          },
          populate: { address: true },
        });
        if (!business) {
          return ctx.notAcceptable("business not access");
        }

        return business;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },

    async create(ctx) {
      try {
        const user = await GetTenantUserJwt();
        if (!user.tenant.id) {
          return ctx.notAcceptable("user no tenant valid");
        }
        ctx.request.body.data.tenant = user.tenant.id;
        const { address } = ctx.request.body.data;
        if (address) {
          const addressService = new AddressService();
          const addressCreated = await addressService.create(address);
          ctx.request.body.data.address = addressCreated.id;
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
        if (!user.tenant.id) {
          return ctx.notAcceptable("user no tenant valid");
        }
        ctx.request.body.data.tenant = user.tenant.id;
        const businessService = new BusinessService();
        const business = await businessService.getById(
          ctx.request.body.data.id
        );

        if (ctx.request.body.data.address) {
          const { address } = ctx.request.body.data;
          const addressService = new AddressService();
          if (business.address) {
            await addressService.update(business.address.id, address);
          } else {
            const addressCreated = await addressService.create(address);
            ctx.request.body.data.address = addressCreated.id;
          }
        }
        const response = super.update(ctx);
        return response;
      } catch (err) {
        return ctx.badRequest(`${err.message}`, JSON.stringify(err));
      }
    },
  })
);
