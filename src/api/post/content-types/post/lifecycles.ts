"use strict";

const { v4: uuid } = require("uuid");

module.exports = {
  beforeCreate: async (data) => {
    if (!data.params.data.tenant) {
      throw new Error("tenant is required");
    }
    const tenant = await strapi.query("api::tenant.tenant").findOne({
      where: {
        id: data.params.data.tenant,
      },
    });
    if (!tenant) {
      throw new Error("tenant invalid");
    }

    data.params.data.protocol = uuid();
  },
  async afterCreate(data) {
    try {
      const { result, params } = data;
      console.log({ result, params });
      const tenant = await strapi.query("api::tenant.tenant").findOne({
        where: {
          id: params.data.tenant,
        },
      });

      const emailTemplate = {
        subject: `Ouvidoria`,
        text: `Sua requisição foi gerada com sucesso!
      Sua requisição gerou o protocolo: ${result.protocol}.`,
        html: `<h1>Sua requisição foi gerada com sucesso!</h1>
    <p>Sua requisição gerou o protocolo: <strong>${result.protocol}</strong> <p>
    <p> Você pode acompanhar a sua requisição através do link <a href="https://ouvidoria-app-pv54x.ondigitalocean.app/ouvidoria/status-denuncia/?company=${tenant.identity}">consultar status</a>.</p>`,
      };

      await strapi.plugins["email"].services.email.sendTemplatedEmail(
        {
          to: result.email,
        },
        emailTemplate
      );
    } catch (err) {
      throw new Error("Error:" + err.message);
    }
  },
};
