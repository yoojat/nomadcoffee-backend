import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String
    location: String
    password: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
  }
`;
