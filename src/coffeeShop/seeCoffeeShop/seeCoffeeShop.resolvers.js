import client from '../../client';

export default {
  Query: {
    seeCoffeeShop: async (_, { id }) => {
      try {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: {
            id,
          },
          include: {
            categorys: true,
          },
        });
        return {
          ok: true,
          coffeeShop,
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
