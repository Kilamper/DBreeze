// src/App.tsx
import React, { useState } from "react";
import DatabaseForm from "./components/DatabaseForm";
import TableList from "./components/TableList";
import { DbConfig } from "./types/dbTypes.ts";

const App: React.FC = () => {
  const [dbConfig, setDbConfig] = useState<DbConfig | null>(null);

  const handleConnect = (config: DbConfig) => {
    setDbConfig(config);  // Actualiza la configuración de la base de datos
  };

  return (
    <div>
      <h1>Database Connection</h1>
      {!dbConfig ? (
        <DatabaseForm onConnect={handleConnect} />
      ) : (
        <TableList dbConfig={dbConfig} />
      )}
    </div>
  );
};

export default App;
