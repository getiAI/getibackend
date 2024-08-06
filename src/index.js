
// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const auditService = require('./services/auditService');
// require('dotenv').config();

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Set up multer for file uploads in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Controller function
// const uploadMarkdown = async (req, res) => {
//   try {
//     const { files } = req;
//     const markdownFile = files.markdownFile[0];
//     const contractFiles = files.contracts || [];

//     // Read the content of the markdown file from the buffer
//     const markdownContent = markdownFile.buffer.toString('utf8');

//     // Analyze contracts and generate the report link
//     const reportLink = await auditService.auditContracts(contractFiles, markdownContent);

//     res.json({ message: 'Audit completed successfully', reportLink });
//   } catch (error) {
//     console.error('Error in uploadMarkdown:', error);
//     res.status(500).json({ error: 'An error occurred during the audit' });
//   }
// };

// // Route
// app.post('/api/audit', upload.fields([{ name: 'markdownFile', maxCount: 1 }, { name: 'contracts', maxCount: 10 }]), uploadMarkdown);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const auditService = require('./services/auditService');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller function
const uploadMarkdown = async (req, res) => {
  try {
    const { files } = req;
    const contractFiles = files.contracts || [];
    const markdownContent = req.body.markdownContent;

    // Analyze contracts and generate the report link
    const reportLink = await auditService.auditContracts(contractFiles, markdownContent);

    res.json({ message: 'Audit completed successfully', reportLink });
  } catch (error) {
    console.error('Error in uploadMarkdown:', error);
    res.status(500).json({ error: 'An error occurred during the audit' });
  }
};

// Route
app.post('/api/audit', upload.fields([{ name: 'markdownFile', maxCount: 1 }, { name: 'contracts', maxCount: 10 }]), uploadMarkdown);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
