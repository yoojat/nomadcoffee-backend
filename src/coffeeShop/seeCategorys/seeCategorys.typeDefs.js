import { gql } from 'apollo-server';

export default gql`
  type SeeCategorysResult {
    ok: Boolean!
    error: String
    categorys: [Category]
  }
  type Query {
    seeCategorys(page: Int): SeeCategorysResult
  }
`;
