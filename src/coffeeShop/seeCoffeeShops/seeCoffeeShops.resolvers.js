import client from '../../client';

export default {
  Query: {
    seeCoffeeShops: async (_, { offset }, { loggedInUser }) => {
      try {
        const coffeeShops = await client.coffeeShop.findMany({
          // skip: (page - 1) * 5,
          take: 2,
          skip: offset,
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },

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
