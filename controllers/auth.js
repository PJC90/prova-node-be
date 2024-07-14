import { Utente } from '../models/index.js'
// npm i bcryptjs  -> hashare la password
import bcrypt from 'bcryptjs'
// npm i jsonwebtoken
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jkvvhvhjvjhhjklfoiwefjkefe'

export const login = async (req, res) => {
  const { email, password } = req.body
  const existingUser = await Utente.findOne({ where: { email } })
  if (!existingUser) {
    return res
      .status(400)
      .json({ status: 'error', message: 'utente o password errata' })
  }
  if (await bcrypt.compare(password, existingUser.password)) {
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      JWT_SECRET
    )
    return res.json({ status: 'ok', token: token })
  }

  res.status(401).json({ status: 'error', message: 'utente o password errata' })
}

export const register = async (req, res) => {
  const { nome, email, password } = req.body

  // Validazione dei dati
  if (!nome || !email || !password) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' })
  }

  if (typeof nome != 'string') {
    return res.json({ status: 'error', message: 'nome non valido' })
  }
  if (password.length < 5) {
    return res.json({ status: 'error', message: 'password troppo corta' })
  }
  const passwordHashed = await bcrypt.hash(password, 10) //10 numero di iterazioni x cryptare la password

  try {
    // Controllo se l'utente esiste già
    const existingUser = await Utente.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email già in uso' })
    }

    // Creazione del nuovo utente
    const newUser = await Utente.create({
      nome,
      email,
      password: passwordHashed,
    })

    // Risposta con i dettagli dell'utente creato (escludendo la password)
    res.status(201).json({
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
    })
  } catch (error) {
    res.status(409).json({ status: 'error', message: error.message })
  }
}
