import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import reservationRouter from './routes/reservation.routes.js'

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', userRouter)
app.use('/api', reservationRouter)


app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))