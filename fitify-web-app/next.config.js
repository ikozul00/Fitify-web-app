module.exports = {
  reactStrictMode: true,
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENT_MANAGEMENT_API_KEY: process.env.CONTENT_MANAGEMENT_API_KEY,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
