import { gql } from 'apollo-server';

export default gql`
  type SeeCategoryResult {
    ok: Boolean!
    error: String
    coffeeShops: [CoffeeShop]
  }
  type Query {
    seeCategory(id: Int!, lastId: Int): SeeCategoryResult!
  }
`;
