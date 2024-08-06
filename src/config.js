// module.exports = {
//     langchainConfig: {
//       // Add LangchainJS configurations here
//     },
//     pineconeConfig: {
//       // Add Pinecone configurations here
//     },
//     openaiApiKey: process.env.OPENAI_API_KEY,
//     pineconeApiKey: process.env.PINECONE_API_KEY,
//     pineconeEnvironment: process.env.PINECONE_ENVIRONMENT,
//     pineconeIndexName: process.env.PINECONE_INDEX_NAME,
//     ipfsConfig: {
//       // Add IPFS configurations here
//     },
//   };
  

require('dotenv').config(); // Ensure dotenv is configured at the top

module.exports = {
    langchainConfig: {
        // Add LangchainJS configurations here
    },
    pineconeConfig: {
        // Add Pinecone configurations here
    },
    openaiApiKey: process.env.OPENAI_API_KEY,
    pineconeApiKey: process.env.PINECONE_API_KEY,
    pineconeEnvironment: process.env.PINECONE_ENVIRONMENT,
    pineconeIndexName: process.env.PINECONE_INDEX_NAME,
    ipfsConfig: {
        // Add IPFS configurations here
    },
};
