import { gql } from 'apollo-server';

export default gql`
  type SeeCoffeeShopsResult {
    ok: Boolean!
    error: String
    coffeeShops: [CoffeeShop]
  }
  type Query {
    seeCoffeeShops: SeeCoffeeShopsResult!
  }
`;
