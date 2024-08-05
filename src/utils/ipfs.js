require('dotenv').config();
const FormData = require('form-data');
const PDFDocument = require('pdfkit');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

const JWT = process.env.PINATA_JWT;
const GATEWAY = process.env.GATEWAY_DOMAIN;

module.exports = {
  uploadReportAsPDF: async (analysisResults) => {
    const doc = new PDFDocument();
    doc.text(JSON.stringify(analysisResults, null, 2));

    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
      doc.end();
    });

    const data = new FormData();
    data.append('file', pdfBuffer, {
      filename: 'analysis-report.pdf',
      contentType: 'application/pdf',
    });

    try {
      const fetch = (await import('node-fetch')).default; // Dynamic import of node-fetch
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });

      const jsonResponse = await response.json();
      if (jsonResponse.error) {
        throw new Error(jsonResponse.error);
      }

      return `https://${GATEWAY}/ipfs/${jsonResponse.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error('Failed to upload report to IPFS');
    }
  },
};
