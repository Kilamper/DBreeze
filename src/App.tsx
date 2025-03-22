// src/App.tsx
import React, { useState } from "react";
import DatabaseForm from "./components/DatabaseForm";
import TableList from "./components/TableList";
import { DbConfig } from "./types/dbTypes.ts";
import Login from "./Login"; // Asegúrate de que la ruta sea correcta


const App: React.FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
