// update the back-end server's code to serve up the React front-end code in production.
const path = require('path');

const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async() => {
    // create a new Apollo server and pass in our schema data
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
            // context: ({ req }) => req.headers
    });

    // Start the Apollo server
    await server.start();

    // integrate our Apollo server with the Express application as middleware
    server.applyMiddleware({ app });

    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//we created was a wildcard GET route for the server. In other words, if we make a GET request to any location on the server
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/404.html'));
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});