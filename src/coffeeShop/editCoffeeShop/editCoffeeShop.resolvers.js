import client from '../../client';
import { processCategories, processPhotoUrls } from '../coffeeShop.utils';

export default {
  Mutation: {
    editCoffeeShop: async (
      _,
      { id, name, address, latitude, longitude, photos, caption },
      { loggedInUser }
    ) => {
      try {
        let categorys = [];
        let photosForConnectOrCreate;
        if (caption) {
          categorys = processCategories(caption);
        }

        if (photos) {
          photosForConnectOrCreate = processPhotoUrls(photos);
        }

        const oldCoffeeShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            photos: {
              select: {
                id: true,
              },
            },
            categorys: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!oldCoffeeShop) {
          return {
            ok: false,
            error: 'Coffee Shop not found.',
          };
        }

        const coffeeShop = await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            address,
            latitude,
            longitude,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(photosForConnectOrCreate &&
              photosForConnectOrCreate.length > 0 && {
                photos: {
                  connectOrCreate: photosForConnectOrCreate,
                },
              }),

            ...(categorys.length > 0 && {
              categorys: {
                disconnect: oldCoffeeShop.categorys,
                connectOrCreate: categorys,
              },
            }),
          },
        });

        if (photosForConnectOrCreate && photosForConnectOrCreate.length > 0) {
          await client.coffeeShopPhoto.deleteMany({
            where: {
              OR: oldCoffeeShop.photos,
            },
          });
        }
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
