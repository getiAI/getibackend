// const auditService = require('../services/auditService');

// exports.auditContracts = async (req, res) => {
//   const { contracts, markdownContent } = req.body;

//   if (!contracts || !markdownContent) {
//     return res.status(400).json({ error: 'Contracts and markdown content are required.' });
//   }

//   try {
//     const reportLink = await auditService.auditContracts(contracts, markdownContent);
//     res.status(200).json({ message: 'Audit completed successfully', reportLink });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred during the audit' });
//   }
// };



const auditService = require('../services/auditService');
const path = require('path');
const fs = require('fs');

exports.auditContracts = async (req, res) => {
  try {
    const contracts = req.files.map(file => path.resolve(file.path));
    const markdownContent = req.body.markdownContent;

    const reportLink = await auditService.auditContracts(contracts, markdownContent);
    res.status(200).json({ message: 'Audit completed successfully', reportLink });
  } catch (error) {
    console.error('Error in auditContracts:', error);
    res.status(500).json({ error: 'An error occurred during the audit' });
  } finally {
    // Clean up uploaded files
    req.files.forEach(file => fs.unlinkSync(file.path));
  }
};
