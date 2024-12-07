import express from 'express'

const app = express()
app.use(express.json())

app.listen(process.env.port, () => {
    console.log(`server is running on port ${process.env.PORT} `)
})