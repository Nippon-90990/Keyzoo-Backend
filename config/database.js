const fs = require("fs");
const path = require("path");

module.exports = ({ env }) => {
  const ssl =
    env.bool("DATABASE_SSL", false) &&
    env("DATABASE_SSL_CA")
      ? {
          ca: fs.readFileSync(
            path.resolve(__dirname, "..", env("DATABASE_SSL_CA"))
          ),
        }
      : false;

  return {
    connection: {
      client: env("DATABASE_CLIENT", "mysql"),
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", ""),
        ssl,
      },
    },
  };
};
