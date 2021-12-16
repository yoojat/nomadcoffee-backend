export const processCategories = (caption) => {
  const categories = caption.match(/#[\w]+/g) || [];
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category },
  }));
};

export const processPhotoUrls = (photoUrls) => {
  return photoUrls.map((photoUrl) => ({
    where: { url: photoUrl },
    create: { url: photoUrl },
  }));
};

// 필드 값이 unique하지 않다면 connectOrCreate를 사용할 수 없음
//영어 + 한글 -> /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g
