export default ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "naoresponda@codarnet.com.br",
        defaultReplyTo: "naoresponda@codarnet.com.br",
        testAddress: "v.cezar21@gmail.com",
      },
    },
  },
});
