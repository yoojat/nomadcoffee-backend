import { gql } from 'apollo-server';

export default gql`
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      address: String
      latitude: String
      longitude: String
      photoFiles: [Upload]
      caption: String
    ): EditCoffeeShopResult!
  }
`;
