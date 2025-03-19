import knex from "knex";

// Crear la conexión a la base de datos de forma dinámica
export const createDatabaseConnection = ({ client, host, user, password, database }) => {
  const config = {
    client: client,  // mysql o sqlite
    connection: {},
  };

  if (client === 'mysql2') {
    config.connection = {
      host: host,
      user: user,
      password: password,
      database: database,
    };
  } else if (client === 'sqlite3') {
    config.connection = {
      filename: database,  // El archivo de la base de datos SQLite
    };
  } else {
    throw new Error("Cliente no soportado");
  }

  return knex(config);
};
