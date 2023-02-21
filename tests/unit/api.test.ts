import { describe, test, expect, vi } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";

global.fetch = vi.fn();

describe("API call to /query", async () => {
  await setup({ server: true });

  function call(query: string | null) {
    return $fetch("/api/query", {
      method: "POST",
      body: {
        query,
      },
    });
  }

  test('Valid SELECT query returns result with "data" and "runtime" keys', async () => {
    const result = await call("SELECT * FROM actors LIMIT 10");

    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("runtime");
  });

  test('Valid SELECT query returns up to 1000 rows in "data" key', async () => {
    const result = await call("SELECT * FROM actors");

    expect(result.data.length).toBeLessThanOrEqual(1000);
  });

  test.fails('Invalid query containing "DELETE" returns an error', async () => {
    await call("DELETE * FROM actors");
  });

  test.fails('Invalid query containing "INSERT" returns an error', async () => {
    await call(`
      INSERT INTO actors (first_name, last_name, gender) 
      VALUES ('John', 'Doe', 'M')
    `);
  });

  test.fails("Non-SELECT query returns an error", async () => {
    await call(`
      UPDATE actors
      SET first_name = 'Jane', gender = 'F') 
      WHERE first_name = 'John' AND last_name = 'Doe'
    `);
  });

  test.fails("Empty query returns an error", async () => {
    await call("");
  });

  test.fails("Query with syntax errors returns an error", async () => {
    await call("SELECT actors LIMIT 10");
  });

  test('"runtime" key in the response object is a floating-point number representing the time in milliseconds', async () => {
    const result = await call("SELECT * FROM actors LIMIT 10");

    expect(result.runtime).toBeTypeOf("number");
    expect(result.runtime).toBeGreaterThan(0);
  });
});
