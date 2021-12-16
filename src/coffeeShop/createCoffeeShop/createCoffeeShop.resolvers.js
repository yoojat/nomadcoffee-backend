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
        { name, latitude, longitude, photoFiles, caption },
        { loggedInUser }
      ) => {
        try {
          let categories = [];
          let photoUrls = [];
          let photos;
          if (caption) {
            categories = processCategories(caption);
          }

          const photoUrlPromises = photoFiles.map(
            async (photoFile) => await uploadPhoto(photoFile, loggedInUser.id)
          );
          Promise.all(photoUrlPromises).then(async (photoUrls) => {
            photos = processPhotoUrls(photoUrls);
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
          });

          // console.log({ photoUrls });
          // 사진 업로드 후 url생성
          // if (photoUrls) {
          // }
          // console.log({ photos });
          // const coffeeShop = await client.coffeeShop.create({
          //   data: {
          //     name,
          //     latitude,
          //     longitude,
          //     user: {
          //       connect: {
          //         id: loggedInUser.id,
          //       },
          //     },
          //     ...(photos.length > 0 && {
          //       photos: {
          //         connectOrCreate: photos,
          //       },
          //     }),
          //     ...(categories.length > 0 && {
          //       categorys: {
          //         connectOrCreate: categories,
          //       },
          //     }),
          //   },
          // });
          // return {
          //   ok: true,
          //   coffeeShop,
          // };
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
