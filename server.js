const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')
const CONNECTION_URI = process.env.MONGODB_URI || dbConfig.url
const PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise

mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

app.get('/', (req, res) => {
  res.json({'message': 'Welcome to todo-list application.'})
})

require('./app/routes/note.routes.js')(app)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
