import { describe, test, expect, vi } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { getSearchActors, getGenres, getActorMovies, getGenreMovies, getGenreRankings } from "../../src/utils/queries";

global.fetch = vi.fn();

describe("Query optimization", async () => {
  await setup({ server: true });

  function call(query: string | null) {
    return $fetch("/api/query", {
      method: "POST",
      body: {
        query,
      },
    });
  }

  const MAX_RUNTIME_MS = 5 * 1000;

  describe("Fetching actors", () => {
    test("Fetching results takes less than 5 seconds", async () => {
      const actorQuery = "s";
      const result = await call(getSearchActors(actorQuery));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching with empty actor query takes less than 5 seconds", async () => {
      const actorQuery = "";
      const result = await call(getSearchActors(actorQuery));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });
  });

  describe("Fetching genres", () => {
    test("Fetching results takes less than 5 seconds", async () => {
      const genreQuery = "a";
      const result = await call(getGenres(genreQuery));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching with empty genre query takes less than 5 seconds", async () => {
      const genreQuery = "";
      const result = await call(getGenres(genreQuery));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });
  });

  describe("Exploring the amount of movies featuring an actor over periods of time", () => {
    test("Fetching results for an actor with the least movies takes less than 5 seconds", async () => {
      const actorId = 845465; // Actor 845465 only has 1 movie
      const result = await call(getActorMovies(actorId, "year"));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching results for an actor with the most movies takes less than 5 seconds", async () => {
      const actorId = 45332; // Actor 45332 has 3280 movies
      const result = await call(getActorMovies(actorId, "year"));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });
  });

  describe("Analyze the amount of movies produced over the years by genre", () => {
    test("Fetching results for an actor with the least movies takes less than 5 seconds", async () => {
      const genre = "Adult"; // "Adult" genre has the least amount of movies with only 30500 movies
      const result = await call(getGenreMovies(genre, "year", undefined, undefined));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching results for an actor with the most movies takes less than 5 seconds", async () => {
      const genre = "Drama"; // "Drama" genre has the most amount of movies with 1913593 movies
      const result = await call(getGenreMovies(genre, "year", undefined, undefined));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });
  });

  describe("Comparing ratings of different genres through the years", () => {
    test("Fetching results for a genre with the least amount of rated movies takes less than 5 seconds", async () => {
      const genre = ["Adult"]; // "Adult" genre has the least amount of rated movies with only 678 movies
      const result = await call(getGenreRankings(genre, "year", undefined, undefined));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching results for a genre with the most amount of rated movies takes less than 5 seconds", async () => {
      const genre = ["Drama"]; // "Drama" genre has the most amount of rated movies with 1080364 movies
      const result = await call(getGenreRankings(genre, "year", undefined, undefined));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });

    test("Fetching results for the top 3 genres with the most rated movies takes less than 5 seconds", async () => {
      const genres = ["Drama", "Comedy", "Action"]; // "Drama", "Comedy", and "Action" are the top 3 genres with the most amount of movies
      const result = await call(getGenreRankings(genres, "year", undefined, undefined));

      expect(result.runtime).toBeLessThan(MAX_RUNTIME_MS);
    });
  });
});
