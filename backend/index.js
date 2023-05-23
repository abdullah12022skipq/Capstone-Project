const connectToMongo = require("./mongodb")
const express = require('express')
const bodyParser = require('body-parser');

connectToMongo();
const app = express()
const port = 5000

// Increase payload size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/story', require('./routes/story'))
app.use('/api/vote', require('./routes/like'))
app.use('/api/comment', require('./routes/comment'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})