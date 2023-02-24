import axios from "axios";
import { Ref } from "nuxt/dist/app/compat/capi";

export default function () {
  const result: Ref<Object[]> = ref([]);
  const fetchTime: Ref<number> = ref(0);

  const error: Ref<String> = ref("");
  const loading: Ref<Boolean> = ref(true);

  async function runQuery(query: string) {
    try {
      const response = await axios.post("/api/query", { query });

      if (response.status === 200) {
        const { data, runtime } = response.data;

        result.value = data;
        fetchTime.value = runtime;
      }

      error.value = "";
    } catch (err: Object | any) {
      error.value = Error(err).message;
    } finally {
      loading.value = false;
    }
  }

  return { runQuery, result, fetchTime, error, loading };
}
