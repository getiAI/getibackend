// const express = require('express');
// const bodyParser = require('body-parser');
// const auditController = require('./controllers/auditController');
// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('AI Audit Backend is running');
// });

// app.post('/api/audit', auditController.auditContracts);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const auditController = require('./controllers/auditController');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/audit', upload.array('contracts'), auditController.auditContracts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
