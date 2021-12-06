import { gql } from 'apollo-server';

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }

  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
    seeFollowers(username: String!, lastId: Int): SeeFollowersResult!
  }
`;
