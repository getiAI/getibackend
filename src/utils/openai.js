
// const { ChatOpenAI } = require("@langchain/openai");
// const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
// const config = require("../config");

// const openai = new ChatOpenAI({
// modelName: 'gpt-4',
// apiKey: 'sk-xMDzZaUAxKA9tyEompUejDbwUaJVYVNUCZWqUGpaX5T3BlbkFJWnrLAWhFR8ZRJeo5L244boskepTN-8DjqvBuU2OVoA',
// temperature: 0,
//   maxTokens: 1000,
// });

// module.exports = {
//   analyzeContracts: async (trainingData) => {
//     const messages = [
//       new SystemMessage({ content: 'You are an assistant that analyzes smart contracts.' }),
//       new HumanMessage({ content: `Analyze the following contracts: ${JSON.stringify(trainingData)}` }),
//     ];

//     try {
//       const response = await openai.call(messages);
//       console.log('OpenAI Response:', response);

//       // Check if the response contains the necessary content
//       if (!response || !response.content) {
//         throw new Error('Invalid response from OpenAI');
//       }

//       return response.content;
//     } catch (error) {
//       console.error('Error in OpenAI call:', error);
//       throw new Error('Failed to analyze contracts with OpenAI');
//     }
//   },
// };

const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const config = require("../config");

const openai = new ChatOpenAI({
  modelName: 'gpt-4',
apiKey: 'sk-xMDzZaUAxKA9tyEompUejDbwUaJVYVNUCZWqUGpaX5T3BlbkFJWnrLAWhFR8ZRJeo5L244boskepTN-8DjqvBuU2OVoA',
temperature: 0,
  maxTokens: 1000,
});

module.exports = {
  analyzeContracts: async (trainingData) => {
    const messages = [
      new SystemMessage({ content: 'You are an assistant that analyzes smart contracts. Refer to the following guidelines during your analysis: [security guidelines and specific rules]' }),
      new HumanMessage({ content: `Analyze the following contracts: ${JSON.stringify(trainingData)}` }),
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
