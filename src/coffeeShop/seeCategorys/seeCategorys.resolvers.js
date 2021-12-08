import client from '../../client';

export default {
  Query: {
    seeCategorys: async (_, { page }) => {
      try {
        const categorys = await client.category.findMany({
          take: 5,
          skip: (page - 1) * 5,
          include: {
            coffeeShops: true,
          },
        });
        return {
          ok: true,
          categorys,
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
