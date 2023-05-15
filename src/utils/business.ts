export default class BusinessService {
  async getById(id: number) {
    const business = await strapi.query("api::business.business").findOne({
      where: {
        id,
      },
      populate: { address: true },
    });

    return business;
  }
}
