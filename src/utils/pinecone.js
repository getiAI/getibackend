// const { PineconeStore } = require('@langchain/pinecone');
// const { OpenAIEmbeddings } = require('@langchain/openai');
// const { Pinecone } =  require ('@pinecone-database/pinecone');

// const config = require('../config');


// const client = new Pinecone({
//     apiKey: '594b86ec-8639-4b35-936d-83bd527b2b52'
//   });
//   const pineconeIndex = client.index('geti');

// module.exports = {
//   storeAnalysis: async (analysisResults) => {
//     const embeddings = new OpenAIEmbeddings();
//     const vectorStore = await PineconeStore.fromDocuments(
//       [
//         {
//           metadata: { result: "analysis" },
//           pageContent: JSON.stringify(analysisResults),
//         },
//       ],
//       embeddings,
//       { pineconeIndex }
//     );
//   },
// };


const { Pinecone } = require('@pinecone-database/pinecone');
const { PineconeStore } = require('@langchain/pinecone');
const { OpenAIEmbeddings } = require('@langchain/openai');
const config = require('../config');


const client = new Pinecone({
    apiKey: '594b86ec-8639-4b35-936d-83bd527b2b52'
  });
  const pineconeIndex = client.index('geti');


module.exports = {
  storeAnalysis: async (analysisResults) => {
    const embeddings = new OpenAIEmbeddings({ dimension: 768 });  // Ensure the correct dimension
    const vectorStore = await PineconeStore.fromDocuments(
      [
        {
          metadata: { result: "analysis" },
          pageContent: JSON.stringify(analysisResults),
        },
      ],
      embeddings,
      { pineconeIndex }
    );
  },
};
