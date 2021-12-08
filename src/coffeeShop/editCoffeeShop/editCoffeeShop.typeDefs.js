import { gql } from 'apollo-server';

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String!
      latitude: String
      longitude: String
      photos: [String]
      caption: String
    ): EditCoffeeShopResult!
  }
`;
