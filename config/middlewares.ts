export default [
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",

  "strapi::session",
  "strapi::favicon",
  {
    name: "strapi::public",
    config: {
      defer: true,
      defaultIndex: "",
    },
  },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "strapi-adv-doc-s3.s3.us-east-1.amazonaws.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            "strapi-adv-doc-s3.s3.us-east-1.amazonaws.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::body",
    config: {
      formLimit: "20mb", // modify form body
      jsonLimit: "20mb", // modify JSON body
      textLimit: "20mb", // modify text body
      formidable: {
        maxFileSize: 20 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
];
