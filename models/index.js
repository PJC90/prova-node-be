import sequelize from '../config/database.js'
import Utente from './utente.js'

export const initModels = async () => {
  await sequelize.sync()
  console.log('Tutti i modelli sono stati sincronizzati.')
}

export { Utente }
