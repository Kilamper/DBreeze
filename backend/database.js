import knex from "knex";

export const createDbConnection = (config) => {
  return knex({
    client: config.client,
    connection: {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    },
  });
};
