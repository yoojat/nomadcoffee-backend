import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
        // select를 사용함으로써 불필요한 정보를 제외하고 필요한 정보를 가지고 옴
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      //findMany를 쓰면 비용이  많이 들 수  있음
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },

    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }), // lastId가 있으면 { cursor : {id: lastId}} 형태로 리턴
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
