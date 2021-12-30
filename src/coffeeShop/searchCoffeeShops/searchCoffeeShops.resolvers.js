import client from '../../client';

const resolvers = {
  Query: {
    searchCoffeeShops: async (_, { keyword }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        include: {
          categorys: true,
          photos: true,
        },
      });
      return { coffeeShops };
    },
  },
};

export default resolvers;
