/**
 * report service
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::report.report",
  ({ strapi }) => ({
    async getAllPosts() {
      console.log(10);
      return await strapi.query("api::postclosed.postclosed").findMany({});
    },
    async monthPosts() {
      console.log(10);
      return await strapi.query("api::postclosed.postclosed").findMany({});
    },
  })
);
