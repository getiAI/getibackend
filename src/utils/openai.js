
const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const fs = require('fs');
const config = require("../config");
const path = require('path'); // Import the path module
require('dotenv').config();

const openai = new ChatOpenAI({
  modelName: 'gpt-4',
  apiKey: config.openaiApiKey,
  temperature: 0,
  maxTokens: 1000,
});

module.exports = {
  analyzeContracts: async (trainingData) => {
    // Read the guidelines from the markdown file
    // const guidelines = fs.readFileSync('./guidelines.md', 'utf8');
    const guidelinesPath = path.resolve(__dirname, '../../guidelines.md'); // Adjust this path if necessary
    const guidelines = fs.readFileSync(guidelinesPath, 'utf8');

    // Combine the contents of the contract files into one message
    const contractsContent = trainingData.contracts.map(contract => `Filename: ${contract.filename}\n\n${contract.content}`).join('\n\n');

    const messages = [
      new SystemMessage({ content: `You are an assistant that analyzes smart contracts. Refer to the following guidelines during your analysis:\n\n${guidelines}` }),
      new HumanMessage({ content: `Analyze the following contracts: ${contractsContent}` }),
    ];

    try {
      const response = await openai.call(messages);
      console.log('OpenAI Response:', response);

      if (!response || !response.content) {
        throw new Error('Invalid response from OpenAI');
      }

      return response.content;
    } catch (error) {
      console.error('Error in OpenAI call:', error);
      throw new Error('Failed to analyze contracts with OpenAI');
    }
  },
};
