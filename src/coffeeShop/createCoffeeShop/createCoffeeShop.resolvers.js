import { GraphQLUpload } from 'graphql-upload';
import { uploadPhoto } from '../../../shared/shared.utils';
import client from '../../client';
import { protectedResolver } from '../../utils';
import { processCategories, processPhotoUrls } from '../coffeeShop.utils';

export default {
  Upload: GraphQLUpload,
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, address, latitude, longitude, photoFiles, caption },
        { loggedInUser }
      ) => {
        try {
          const photoUrlPromises = photoFiles.map((photoFile) =>
            uploadPhoto(photoFile, loggedInUser.id)
          );
          const categories = processCategories(caption);
          const photoUrls = await Promise.all(photoUrlPromises);
          const photos = processPhotoUrls(photoUrls);
          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              address,
              caption,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(photoUrls.length > 0 && {
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
