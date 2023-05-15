/**
 * A set of functions called "actions" for `cep`
 */
import axios from "axios";
type Address = {
  street: string;
  district: string;
  city: string;
  uf: string;
  cep: string;
};

export default {
  search: async (ctx, next) => {
    try {
      const { query, params } = ctx.request;
      if (params.cep) {
        const cep = params.cep.replace(/[^0-9]/g, "");
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address: Address = {
          cep: cep,
          city: res.data.localidade,
          district: res.data.bairro,
          street: res.data.logradouro,
          uf: res.data.uf,
        };
        return (ctx.body = address);
      }
    } catch (err) {
      return ctx.badRequest(`${err.message}`, JSON.stringify(err));
    }
  },
};
