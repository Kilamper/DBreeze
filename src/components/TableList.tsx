// src/components/TableList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DbConfig } from "../types/dbTypes";

interface TableListProps {
  dbConfig: DbConfig;
  onTableSelect: (table: string, dbConfig: DbConfig) => void; // New prop
}

const TableList: React.FC<TableListProps> = ({ dbConfig, onTableSelect }) => {
  const [tables, setTables] = useState<string[]>([]);
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

  const handleTableClick = (table: string) => {
    localStorage.setItem("table", JSON.stringify({ name: table, dbConfig }));
    onTableSelect(table, dbConfig); // Notify parent
  };

  return (
    <ul>
      {tables.map((table, index) => (
        <li
          key={index}
          onClick={() => handleTableClick(table)}
          style={{ cursor: "pointer" }}
        >
          {table}
        </li>
      ))}
    </ul>
  );
};

export default TableList;
