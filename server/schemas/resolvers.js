const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // Write the Resolver to Get Thoughts
        thoughts: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        }
    }
};


module.exports = resolvers;