export const findOrCreateAuthor = async (client, author) => {
  const authorResult = await client.query(
    "SELECT id FROM authors WHERE name = $1",
    [author],
  );

  if (authorResult.rows.length > 0) {
    return authorResult.rows[0].id;
  }

  const newAuthorResult = await client.query(
    "INSERT INTO authors (name) VALUES ($1) RETURNING id",
    [author],
  );

  return newAuthorResult.rows[0].id;
};

export const findOrCreateGenre = async (client, genre) => {
  const genreResult = await client.query(
    "SELECT id FROM genres WHERE name = $1",
    [genre],
  );

  if (genreResult.rows.length > 0) {
    return genreResult.rows[0].id;
  }

  const newGenreResult = await client.query(
    "INSERT INTO genres (name) VALUES ($1) RETURNING id",
    [genre],
  );

  return newGenreResult.rows[0].id;
};
