import { gql } from 'apollo-server';

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
  }
  type CoffeeShop {
    id: Int
    name: String!
    address: String
    caption: String
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]
    categorys: [Category]
    isMine: Boolean
  }
  type Category {
    id: Int
    name: String
    slug: String
    coffeeShops: [CoffeeShop]
    totalShops: Int
  }
`;
