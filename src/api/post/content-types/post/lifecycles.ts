"use strict";

const { v4: uuid } = require("uuid");

module.exports = {
  beforeCreate: async (data) => {
    data.params.data.protocol = uuid();
  },
  async afterCreate(event) {
    const { result, params } = event;

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
  },
};
