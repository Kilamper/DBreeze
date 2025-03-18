// src/types/dbTypes.ts
export interface DbConfig {
  client: string;
  host: string;
  user: string;
  password?: string;
  database: string;
}

export interface Table {
  [key: string]: string;
}
