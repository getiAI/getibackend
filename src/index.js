const express = require('express');
const bodyParser = require('body-parser');
const auditController = require('./controllers/auditController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('AI Audit Backend is running');
});

app.post('/api/audit', auditController.auditContracts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
