import express from 'express';
import dotenv from 'dotenv'; // Importa dotenv
import routes from './index.js';

dotenv.config(); // Carga las variables de entorno

const app = express();
app.use(express.json());

// Importa todas las rutas automáticamente
app.use('/api', routes);

const PORT = process.env.VITE_BACKEND_PORT || 5000; // Usa la variable de entorno correcta
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
