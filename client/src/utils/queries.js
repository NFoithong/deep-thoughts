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

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
      }
    }
  }
`;