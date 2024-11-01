import axios from "axios";
import { useCallback, useState } from "react";

const usePost = (url) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);

      try {
        await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { postData, error, loading };
};

export default usePost;
