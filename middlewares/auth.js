import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jkvvhvhjvjhhjklfoiwefjkefe'

export const authenticateToken = (req, res, next) => {
  // essendo un middlewares una volta finito i suoi controlli passa al NEXT che sarebbe la funzione che deve avvenire dopo tipo getAllUser, deleteUser etc etc
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET, (error, user) => {
    console.log(error)
    if (error) return res.sendStatus(403)
    req.user = user
    next()
  })
}
