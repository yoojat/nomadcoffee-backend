import client from '../client';

export default {
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categorys: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
