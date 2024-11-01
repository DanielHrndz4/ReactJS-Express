import axios from "axios";
import { useCallback, useState } from "react";

const useUpdate = (url, method = "PUT") => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        await axios.put(`${url}/${id}`,{},{
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
    [url],
  );

  return { updateData, error, loading };
};

export default useUpdate;
