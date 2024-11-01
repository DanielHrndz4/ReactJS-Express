import axios from "axios";
import { useState, useCallback } from "react";

const useDelete = (url) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${url}`);
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { deleteData, error, loading };
};

export default useDelete;
