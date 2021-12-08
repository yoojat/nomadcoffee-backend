import { gql } from 'apollo-server';

export default gql`
  type SeeCoffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }
  type Query {
    seeCoffeeShop(id: Int!): SeeCoffeeShopResult!
  }
`;
