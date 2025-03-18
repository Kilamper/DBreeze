import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbRoutes from './dbRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.VITE_BACKEND_PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/api', dbRoutes)

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
