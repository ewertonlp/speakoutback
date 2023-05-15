type AddressType = {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  uf: string;
  cep: string;
  latitude?: string;
  longitude?: string;
};

export default class AddressService {
  async getById(id: number) {
    const address = await strapi.query("api::address.address").findOne({
      where: {
        id,
      },
    });

    return address;
  }
  async create(address: AddressType) {
    const response = await strapi.query("api::address.address").create({
      data: address,
    });

    return response;
  }
  async update(id: number, address: AddressType) {
    const response = await strapi.query("api::address.address").update({
      where: { id },
      data: address,
    });
    return response;
  }
}
