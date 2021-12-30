import { resolvers, typeDefs } from './schema';
import { getUser } from './users/users.utils';
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import logger from 'morgan';
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

async function startServer() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    playground: true,
    introspection: true,

    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());
  // app.use(logger('tiny'));
  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: process.env.PORT || 5000 }, r));
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}

startServer();
// const apollo = new ApolloServer({
//   resolvers,
//   typeDefs,
//   playground: true,
//   introspection: true,

//   context: async ({ req }) => {
//     return {
//       loggedInUser: await getUser(req.headers.token),
//     };
//   },
// });

// const app = express();
// app.use(logger('tiny'));
// apollo.applyMiddleware({ app });
// app.use('/static', express.static('uploads'));
// app.listen({ port: PORT }, () => {
//   console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
// });
