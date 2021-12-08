import client from '../../client';
import { protectedResolver } from '../../utils';
import { processCategories, processPhotoUrls } from '../coffeeShop.utils';

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photoUrls, caption },
        { loggedInUser }
      ) => {
        try {
          let categories = [];
          let photos = [];
          if (caption) {
            categories = processCategories(caption);
          }

          if (photoUrls) {
            photos = processPhotoUrls(photoUrls);
          }
          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(photos.length > 0 && {
                photos: {
                  connectOrCreate: photos,
                },
              }),
              ...(categories.length > 0 && {
                categorys: {
                  connectOrCreate: categories,
                },
              }),
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
      }
    ),
  },
};
