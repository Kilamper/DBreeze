// src/components/DatabaseForm.tsx
import React, { useState } from "react";
import { DbConfig } from "../types/dbTypes.ts";

interface DatabaseFormProps {
  onConnect: (config: DbConfig) => void;
}

const DatabaseForm: React.FC<DatabaseFormProps> = ({ onConnect }) => {
  const [client, setClient] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [database, setDatabase] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (client !== "mysql2" && client !== "sqlite3") {
      alert("Client must be either 'mysql2' or 'sqlite3'.");
      return;
    }
    const config: DbConfig = { client, host, user, password, database };
    onConnect(config);  // Llamamos a la función onConnect que pasamos como prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client (mysql, pg, sqlite3)"
      />
      <input
        type="text"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        placeholder="Host"
      />
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={database}
        onChange={(e) => setDatabase(e.target.value)}
        placeholder="Database"
      />
      <button type="submit">Connect</button>
    </form>
  );
};

export default DatabaseForm;
