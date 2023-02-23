import axios from "axios";
import { Ref } from "nuxt/dist/app/compat/capi";

export default function (query: Ref) {
  const result = ref([]);
  const fetchTime = ref(0);

  const error = ref("");

  async function runQuery() {
    try {
      const response = await axios.post("/api/query", { query: query.value });

      if (response.status === 200) {
        const { data, runtime } = response.data;

        result.value = data;
        fetchTime.value = runtime;
      }

      error.value = "";
    } catch (err: Object | any) {
      error.value = err.response.data.error;
    }
  }

  return { runQuery, result, fetchTime, error };
}
