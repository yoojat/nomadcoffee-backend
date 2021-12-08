import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      try {
        const coffeeShops = await client.coffeeShop.findMany({
          skip: (page - 1) * 5,
          take: 5,
        });
        return {
          ok: true,
          coffeeShops,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};
