// const langchain = require('../utils/langchain');
// const openai = require('../utils/openai');
// const ipfs = require('../utils/ipfs');

// exports.auditContracts = async (contracts, markdownContent) => {
//   try {
//     // Prepare training data
//     const trainingData = await langchain.prepareTrainingData(contracts, markdownContent);

//     // Analyze contracts using OpenAI GPT-4
//     const analysisResults = await openai.analyzeContracts(trainingData);

//     // Upload report as PDF to IPFS
//     const reportLink = await ipfs.uploadReportAsPDF(analysisResults);

//     return reportLink;
//   } catch (error) {
//     console.error('Error in auditContracts:', error);
//     throw new Error('Audit process failed');
//   }
// };



const langchain = require('../utils/langchain');
const openai = require('../utils/openai');
const fs = require('fs');
const ipfs = require('../utils/ipfs');

exports.auditContracts = async (contractFiles, markdownContent) => {
  try {
    // Read the contents of the contract files
    const contracts = contractFiles.map(file => {
      const content = fs.readFileSync(file, 'utf8');
      return { filename: file, content };
    });

    // Prepare training data
    const trainingData = await langchain.prepareTrainingData(contracts, markdownContent);

    // Analyze contracts using OpenAI GPT-4
    const analysisResults = await openai.analyzeContracts(trainingData);

    // Upload report as PDF to IPFS
    const reportLink = await ipfs.uploadReportAsPDF(analysisResults);

    return reportLink;
  } catch (error) {
    console.error('Error in auditContracts:', error);
    throw new Error('Audit process failed');
  }
};
