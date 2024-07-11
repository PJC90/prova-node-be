import { Utente } from '../models/index.js'

export const getAllUsers = async (req, res) => {
  try {
    const utenti = await Utente.findAll()
    res.json(utenti)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const saveUser = async (req, res) => {
  const { nome, email, password } = req.body
  try {
    const nuovoUtente = await Utente.create({ nome, email, password })
    res
      .status(201)
      .json(`Utente ${nuovoUtente.nome} aggiunto con ID ${nuovoUtente.id}`)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const utente = await Utente.findByPk(id)
    if (utente) {
      res.json(utente)
    } else {
      res.status(404).send('Utente non trovato')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Utente.destroy({ where: { id } })
    if (result) {
      res.send('Utente eliminato')
    } else {
      res.status(404).send('Utente non trovato')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { nome, password, email } = req.body
  try {
    const utente = await Utente.findByPk(id)
    if (utente) {
      if (nome) utente.nome = nome
      if (password) utente.password = password
      if (email) utente.email = email
      await utente.save()
      res.json(utente)
    } else {
      res.status(404).send('Utente non trovato')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}
