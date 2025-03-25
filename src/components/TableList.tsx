// src/components/TableList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DbConfig } from "../types/dbTypes";
import { DataTable } from "./data-table/DataTable"; // Importar el componente DataTable

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
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        {selectedTable || "Select a table"} 
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable tableName={selectedTable!} dbConfig={dbConfig} />
      </div>
    </div>
  );
};

export default TableList;
