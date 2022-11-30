import express from 'express'
import cors from 'cors'
import personRouter from './routes/persons.routes.js'
import tableRouter from './routes/tables.routes.js'
import reservationRouter from './routes/reservations.routes.js'

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', personRouter)
app.use('/api', tableRouter)
app.use('/api', reservationRouter)


app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))