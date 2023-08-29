"use strict";

const { v4: uuid } = require("uuid");

module.exports = {
  async beforeCreate(event) {
    event.params.data.protocol = uuid().toString().substring(0, 10);
  },
  async afterCreate(event) {
    try {
      const { result, params } = event;

      const tenant = await strapi.query("api::tenant.tenant").findOne({
        where: {
          id: params.data.tenant,
        },
      });
      if (!tenant) {
        throw new Error("tenant invalid");
      }

      const emailTemplate = {
        subject: `Ouvidoria`,
        text: `Sua requisição foi gerada com sucesso!
      Sua requisição gerou o protocolo: <p>${result.protocol}</p>`,
        html: `<h1>Sua requisição foi gerada com sucesso!</h1>
    <p>Sua requisição gerou o protocolo: <h3>${result.protocol}</h3> </p>
    <p> Você pode acompanhar a sua requisição através do link <a href="${process.env.FRONT_URL}/ouvidoria/status-denuncia/?company=${tenant.identity}">consultar status</a>.</p>`,
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
