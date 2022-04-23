import {gql} from '@apollo/client';

// The query will be used on the homepage of the application
export const QUERY_THOUGHTS = gql `
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createAt
            username
            reactionCount
            reactions {
                _id
                createAt
                username
                reactionBody
            }
        }
    }
`;