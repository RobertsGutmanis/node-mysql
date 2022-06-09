const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./api.js')
app.use(cors());
app.use(express.json())

app.use('/api', api)

app.listen(process.env.PORT || 3000)