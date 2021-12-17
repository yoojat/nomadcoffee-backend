import client from '../../client';
import { uploadPhoto } from '../../shared/shared.utils';
import { processCategories, processPhotoUrls } from '../coffeeShop.utils';

export default {
  Mutation: {
    editCoffeeShop: async (
      _,
      { id, name, address, latitude, longitude, photos, caption },
      { loggedInUser }
    ) => {
      try {
        // let categorys = [];
        // let photosForConnectOrCreate;
        // if (caption) {
        //   categorys = processCategories(caption);
        // }

        // if (photos) {
        //   photosForConnectOrCreate = processPhotoUrls(photos);
        // }

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

        const photoUrlPromises = photoFiles.map((photoFile) =>
          uploadPhoto(photoFile, loggedInUser.id)
        );
        const categories = processCategories(caption);
        const photoUrls = await Promise.all(photoUrlPromises);
        const photos = processPhotoUrls(photoUrls);

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
            ...(photoUrls.length > 0 && {
              photos: {
                disconnect: oldCoffeeShop.photos,
                connectOrCreate: photos,
              },
            }),

            ...(categories.length > 0 && {
              categorys: {
                disconnect: oldCoffeeShop.categorys,
                connectOrCreate: categories,
              },
            }),
          },
        });

        if (photos && photos.length > 0) {
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
