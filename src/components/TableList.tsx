// src/components/TableList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DbConfig } from "../types/dbTypes";
import { ExampleTable } from "./ExampleTable"; // Importar el componente ExampleTable

interface TableListProps {
  dbConfig: DbConfig;
}

const TableList: React.FC<TableListProps> = ({ dbConfig }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null); // Estado para la tabla seleccionada
  const API_URL = "http://localhost:8080/api/tables";

  useEffect(() => {
    if (dbConfig) {
      const fetchTables = async () => {
        try {
          console.log("Sending dbConfig:", dbConfig); // Agrega un log para verificar el contenido de dbConfig
          const response = await axios.post(API_URL, dbConfig);
          setTables(response.data);
        } catch (error) {
          console.error("Error fetching tables:", error);
        }
      };
      fetchTables();
    }
  }, [API_URL, dbConfig]);

  return (
    <div>
      <h2>Tables</h2>
      <ul>
        {tables.map((table, index) => (
          <li key={index} onClick={() => setSelectedTable(table)} style={{ cursor: "pointer" }}>
            {table}
          </li>
        ))}
      </ul>
      {selectedTable && <ExampleTable tableName={selectedTable} dbConfig={dbConfig} />} {/* Renderizar ExampleTable */}
    </div>
  );
};

export default TableList;
