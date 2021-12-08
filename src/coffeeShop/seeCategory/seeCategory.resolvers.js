import client from '../../client';

export default {
  Query: {
    seeCategory: async (_, { id, lastId }) => {
      try {
        const coffeeShops = client.category
          .findUnique({ where: { id } })
          .coffeeShops({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
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
