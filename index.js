//      npm init -y                 crea package.json
//      crea index.js               perchè di default nel package.json nel main c'è index.js
//      npm i --save express        Installa node_module
import express from 'express'
//      per abilitare l'import dei moduli devi aggiungere "type": "module", nel package.json
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import { initModels } from './models/index.js'
import cors from 'cors'
import { authenticateToken } from './middlewares/auth.js'
const app = express()
const PORT = 3008

//      node index.js                   avvio dell'applicazione, non è live non si aggiorna automaticamente! per cui si installa nodemon
//      npm i --save-dev nodemon        installa il live server
//      "start": "node index.js",       npm start  da aggiungere al package.json (qui non ti conviene mettere nodemon index.js perchè nel deploy non ti troverà nodemon)
//      "dev": "nodemon index.js"       npm run dev
//      npm install sequelize mysql2
//      npm install cors

// Abilita CORS per tutti gli origini
app.use(cors())

// Usa il middleware per analizzare i corpi delle richieste JSON
app.use(express.json())

// Inizializzare i modelli e sincronizzare il database
initModels().catch((err) => console.error(err))

// Endpoint
app.use('/users', authenticateToken, usersRoutes)
app.use('/auth', authRoutes)
app.get('/', (req, res) => res.send('Benventuto nell home'))

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
