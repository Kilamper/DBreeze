// src/components/TableList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DbConfig } from "../types/dbTypes";
//import { Table } from "../types/dbTypes.ts";

interface TableListProps {
  dbConfig: DbConfig;
}

const TableList: React.FC<TableListProps> = ({ dbConfig }) => {
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    if (dbConfig) {
      const fetchTables = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/tables",
            dbConfig
          );
          setTables(response.data);
        } catch (error) {
          console.error("Error fetching tables:", error);
        }
      };
      fetchTables();
    }
  }, [dbConfig]);

  return (
    <div>
      <h2>Tables</h2>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>{table}</li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
