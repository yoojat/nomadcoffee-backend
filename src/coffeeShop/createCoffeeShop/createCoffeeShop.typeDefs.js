import { gql } from 'apollo-server';

export default gql`
  type CreateCoffeeShoptResult {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      photoUrls: [String]
      caption: String
    ): CreateCoffeeShoptResult
  }
`;
