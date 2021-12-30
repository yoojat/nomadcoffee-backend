import { gql } from 'apollo-server';

export default gql`
  type SearchCoffeeShopsResult {
    coffeeShops: [CoffeeShop]
  }
  type Query {
    searchCoffeeShops(keyword: String!): SearchCoffeeShopsResult
  }
`;
