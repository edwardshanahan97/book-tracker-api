export const isValidBook = (book) => {
  const { title, author, published_year, rating, finished, genres } = book;

  if (typeof title !== "string" || title.trim() === "") {
    return false;
  }

  if (typeof author !== "string" || author.trim() === "") {
    return false;
  }

  if (!Number.isInteger(published_year)) {
    return false;
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return false;
  }

  if (typeof finished !== "boolean") {
    return false;
  }

  if (!Array.isArray(genres)) {
    return false;
  }

  if (
    genres.some((genre) => typeof genre !== "string" || genre.trim() === "")
  ) {
    return false;
  }

  return true;
};

export const isValidBookId = (id) => {
  return Number.isInteger(id) && id > 0;
};
