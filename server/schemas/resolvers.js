const resolvers = {
    Query: {
        helloworld: () => {
            return 'Hello World';
        }
    }
};

module.exports = resolvers;