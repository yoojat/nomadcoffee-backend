import { gql } from 'apollo-server';

export default gql`
  scalar Upload

  type CreateCoffeeShoptResult {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photoFiles: [Upload]!
      caption: String!
    ): CreateCoffeeShoptResult
  }
`;
