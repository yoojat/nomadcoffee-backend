import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: async (_, { lastId }) => {
      try {
        const coffeeShops = await client.coffeeShop.findMany({
          // skip: (page - 1) * 5,
          take: 2,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
          include: { photos: true, categorys: true, user: true },
          orderBy: {
            createdAt: 'desc',
          },
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
