import express, { Request, Response, RequestHandler } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

app.use(cors())
app.use(express.json())

io.on('connection', socket => {
  console.log('a user connected:', socket.id)

  socket.on('move', data => {
    socket.broadcast.emit('move', data)
  })
})

const homeHandler: RequestHandler = (_req, res) => {
  res.send('Chaotic Smash Server Running')
}
app.get('/', homeHandler)

httpServer.listen(4050, () => {
  console.log('Server listening on http://localhost:4050')
})