export function getSearchActors(match: string) {
  return `
    SELECT  id, 
            CONCAT(first_name, ' ', last_name) AS name
    FROM    actors 
    WHERE   CONCAT(first_name, ' ', last_name) LIKE '${match}%'
    LIMIT   100
  `;
}

export function getGenres(match: string) {
  return `
    SELECT DISTINCT genre
    FROM movies_genres
    WHERE genre LIKE '${match}%'
    ORDER BY genre
  `;
}

function checkValidPeriod(period: string) {
  if (!["year", "decade", "century"].includes(period))
    throw new Error(`Invalid period, must be "year", "decade", or "century". (found ${period})`);
}

function isValidYear(year: any) {
  return typeof year === "number" && year >= 1800 && year <= 2100;
}

//  QUERY: Exploring the amount of movies featuring an actor over periods of time
export function getActorMovies(actorId: number, period: string) {
  checkValidPeriod(period);

  const periodQuery: Object = {
    year: "movies.year",
    decade: "FLOOR(movies.year/10)*10",
    century: "FLOOR(movies.year/100)*100",
  };

  return `
    SELECT	period, 
            COUNT(movie_id) AS count_movies
    FROM (
      SELECT  roles.actor_id,
              roles.movie_id,
              ${periodQuery[period]} AS period
      FROM    roles
      LEFT JOIN movies ON movies.id = roles.movie_id
      WHERE   roles.actor_id = ${actorId}
    ) t
    LEFT JOIN actors ON actors.id = t.actor_id
    GROUP BY  actor_id, period
    ORDER BY  period
  `;
}

// QUERY: Analyze the amount of movies produced over the years by genre
export function getGenreMovies(
  genreName: string,
  period: string,
  fromYear: number | undefined,
  toYear: number | undefined
) {
  checkValidPeriod(period);

  const periodQuery: Object = {
    year: "movies.year",
    decade: "FLOOR(movies.year/10)*10",
    century: "FLOOR(movies.year/100)*100",
  };

  const yearFilter = isValidYear(fromYear)
    ? isValidYear(toYear)
      ? `AND movies.year >= ${fromYear} AND movies.year <= ${toYear}`
      : `AND movies.year >= ${fromYear}`
    : isValidYear(toYear)
    ? `AND movies.year <= ${toYear}`
    : "";

  return `
    SELECT  period, COUNT(movie_id) as count_movies 
    FROM (
      SELECT  movie_id, 
              ${periodQuery[period]} AS period 
      FROM movies_genres 
      LEFT JOIN movies on movies.id = movies_genres.movie_id 
      WHERE genre LIKE '${genreName}' 
            ${yearFilter}
    ) t 
    GROUP BY period 
    ORDER BY period
  `;
}

export function getGenreRankings(
  genres: string[],
  period: string,
  fromYear: number | undefined,
  toYear: number | undefined
) {
  checkValidPeriod(period);

  const periodQuery: Object = {
    year: "movies.year",
    decade: "FLOOR(movies.year/10)*10",
    century: "FLOOR(movies.year/100)*100",
  };

  const genreColumns = genres.map(
    (genre) => `ROUND(AVG(CASE WHEN mg.genre = '${genre}' THEN movies.rank END), 2) AS '${genre}' `
  );

  const yearFilter = isValidYear(fromYear)
    ? isValidYear(toYear)
      ? `WHERE movies.year >= ${fromYear} AND movies.year <= ${toYear}`
      : `WHERE movies.year >= ${fromYear}`
    : isValidYear(toYear)
    ? `WHERE movies.year <= ${toYear}`
    : "";

  return `
    SELECT ${periodQuery[period]} AS period, ${genreColumns.join(", ")}
    FROM movies
    LEFT JOIN movies_genres AS mg ON mg.movie_id = movies.id
    ${yearFilter}
    GROUP BY period
    ORDER BY period
  `;
}
