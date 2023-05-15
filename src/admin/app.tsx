export default {
  config: {
    home: {
     logo: "strapi-logo.png"
    },
    auth:{
      logo: "strapi-logo.png"
    },
    menu:{
      logo: "strapi-logo.png"
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome",
        "Auth.form.welcome.subtitle": "Login in to your account"
      },
    },
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  bootstrap(app) {
    console.log(39, app);
  },
};
