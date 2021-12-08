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
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    coffeeShops: [CoffeeShop]
    createdAt: String!
    updatedAt: String!
  }
`;
